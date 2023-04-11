import "./index.css";

interface IUser {
    birthday: string;
    firstName: string;
    lastName: string;
}

function formatName(user: IUser) {
    return `${user.firstName} ${user.lastName}`;
}

function getUserAge(user: IUser) {
    const today = new Date();
    const userBirthday = new Date(user.birthday);
    const userAge = today.getFullYear() - userBirthday.getFullYear();
    return userAge;
}

const user: IUser = {
    birthday: "02/02/2004",
    firstName: "Arthur",
    lastName: "Sales",
};

const welcomeHeading = (
    <h1 className="text-3xl font-bold uppercase text-center">
        Olá, meu nome é {formatName(user)}, tenho {getUserAge(user)} anos e este
        é meu primeiro contato com JSX.
    </h1>
);

function App() {
    return welcomeHeading;
}

export default App;
