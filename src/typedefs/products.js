export const typeDef = `
    type Products {
        id: ID!
        title: String
        price: Float
        description: String
        category: String
        image: String
        rating: {
            rate: Float
            count: Float
        }
    }
`;
