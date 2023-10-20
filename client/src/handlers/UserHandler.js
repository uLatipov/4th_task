import api from "../http/api.js";

class UserHandler {
    constructor(navigate, setUsers, setIsLoading, setData) {
        this.navigate = navigate;
        this.setUsers = setUsers;
        this.setIsLoading = setIsLoading;
        this.setData = setData;
    }
    async refresh() {
        try {
            const response = await api.get("/api/refresh");
            return response.data;
        } catch (e) {
            console.log("error caught", e);
            this.navigate("/login");
        }
    }

    async start() {
        this.setIsLoading(true);
        const newData = await this.refresh();
        if (newData) this.setData(newData);
        this.setIsLoading(false);
    }

    async fetchUsers() {
        try {
            const response = await api.get("/api/users");
            this.setUsers(response.data.users);
        } catch (e) {
            console.log(e);
            this.navigate("/login");
        }
    }
}

export default UserHandler;
