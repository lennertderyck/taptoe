const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { AuthenticationError } = require('apollo-server-core');
const { defaultFieldResolver } = require('graphql');
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
          const authDirective = getDirective(schema, fieldConfig, directiveName);
            if (authDirective) {                
                // Get this field's original resolver
                const { resolve = defaultFieldResolver } = fieldConfig;
                
                // Replace the original resolver with a function that *first* calls
                // the original resolver, then converts its result to upper case
                fieldConfig.resolve = async (source, args, context, info) => {
                    const result = await resolve(source, args, context, info);
                    
                    // The currrent users role, extracted from the bearer token
                    const { role: currentUserRole, roleConfig } = context;
                    const [{ requires: requiredRole }] = authDirective;
                    
                    console.log('directive activated');
                    
                    // Check if a token is provided
                    const tokenIsProvided = context && Object.keys(context).length > 0;
                    
                    // Since this is a directive, we can assume that a valid bearer token will be required
                    // If none is provided, throw an error
                    if (!tokenIsProvided) throw new AuthenticationError('Not authenticated. A valid bearer token is required.');
                    
                    // Check if a token is provided but no role is required
                    // Just authenticating is enough here
                    else if (!requiredRole) return result;
                    
                    // Check if the current user has the required role
                    else if (requiredRole === currentUserRole) return result;
                    
                    // Check wether a user with a high role can access a field with a lower role
                    const foundIncludingRole = roleConfig.includes.filter(role => role.name === requiredRole).length > 0
                    
                    // If the current user has the required (including) role, return the result
                    if (foundIncludingRole)  return result;
                    
                    // If user has been authenticated but not authorized, throw an error
                    else throw new AuthenticationError(String(`
                        No sufficient rights. You need a higher role to gain access.
                        You have the role ${currentUserRole} but you need the role ${requiredRole}
                    `).trim());
                }
                
                return fieldConfig;
            }
        }
      });
}

module.exports = {
    authenticationDirectiveSchema
}