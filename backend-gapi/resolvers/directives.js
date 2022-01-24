const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { AuthenticationError } = require('apollo-server-core');
const { Role } = require('../mongo');

const authenticationDirectiveSchema = (schema, directiveName) => {
    // console.log(schema)
    return mapSchema(schema, {
        [MapperKind.TYPE]: type => {
            const authDirective = getDirective(schema, type, directiveName)?.[0]
            if (authDirective) {
              typeDirectiveArgumentMaps[type.name] = authDirective
            }
            return undefined
        },

        // Executes once for each object field in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {

          // Check whether this field has the specified directive
          const upperDirective = getDirective(schema, fieldConfig, directiveName);
            if (upperDirective) {

                // Get this field's original resolver
                const { resolve = defaultFieldResolver } = fieldConfig;
                
                // Replace the original resolver with a function that *first* calls
                // the original resolver, then converts its result to upper case
                fieldConfig.resolve = async (source, args, context, info) => {
                    const result = await resolve(source, args, context, info);
                    
                    // The currrent users role, extracted from the bearer token
                    const { userId, role: currentUserRole } = context;
                    
                    const [{ requires: requiredRole }] = upperDirective;
                    
                    console.log('directive activated');
                    
                    // Check if a token is provided
                    const tokenIsProvided = context && Object.keys(context).length > 0;
                    
                    // Since this is a directive, we can assume that a valid bearer token will be required
                    // If none is provided, throw an error
                    if (!tokenIsProvided) throw new AuthenticationError('Not authenticated. Set a bearer token in the Authorization header.');
                    
                    // Check if a token is provided but no role is required
                    // Just authenticating is enough here
                    else if (!requiredRole) return result;
                    
                    // Check if the current user has the required role
                    else if (requiredRole === currentUserRole) return result;
                    
                    // Fetch the most recent role configuraton
                    // This is to check wether a user with a high role can access a field with a lower role
                    const foundRole = await Role.findOne({ name: currentUserRole }).populate('includes');
                    const foundIncludingRole = foundRole.includes.filter(role => role.name === requiredRole).length > 0
                    
                    // If the current user has the required (including) role, return the result
                    if (foundIncludingRole)  return result;
                    
                    else throw new AuthenticationError('No sufficient rights. You need to be a higher role to get access.');
                }
                return fieldConfig;
            }
        }
      });
}

module.exports = {
    authenticationDirectiveSchema
}