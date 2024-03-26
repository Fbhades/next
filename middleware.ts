import { authMiddleware } from "@clerk/nextjs";

const middleware = authMiddleware({
    publicRoutes: ["/api/products", "/" , "/Details/:id"] 
});

export default middleware;

export const config = {
    api: {
        bodyParser: false, 
    },
};
