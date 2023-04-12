import prisma from "../src/database/database-connection.js";

async function main(){
    await prisma.users.createMany({
        data: [
            {
                "name": "stonas",
                "email": "luis@gmail.com",
                "password": "123321"
            },
            {
                "name": "lucas",
                "email": "lucas@gmail.com",
                "password": "123321"
            },
            {
                "name": "jonas",
                "email": "jonas@gmail.com",
                "password": "123321"
            },
            {
                "name": "bob",
                "email": "bob@gmail.com",
                "password": "123321"
            }
        ]
    })
}

main()
    .then(() => {
        console.log("Data successfully submitted");
    })
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })