import { authMiddleware } from "@clerk/nextjs";

const middleware = authMiddleware({
    publicRoutes: ["/api/products", "/" ,"/api/users","/api/products/:id","api/products/:famille","/api/command"] ,
});

export default middleware;

export const config = {
    api: {
        bodyParser: false, 
    },
};
