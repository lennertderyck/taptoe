const { gql } = require("apollo-server-core");

module.exports = gql`
    """
    Secure GraphQL API with user roles
    Possible roles:
        - admin
        - user
        - guest
    """
    directive @auth(
        requires: String = ADMIN,
    ) on OBJECT | FIELD | FIELD_DEFINITION | INPUT_FIELD_DEFINITION
`