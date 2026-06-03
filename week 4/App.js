const UserAPI = { 

    fetchUsers: async function () { 

        return new Promise((resolve, reject) => { 

            setTimeout(() => { 

                const success = true; 

                if (success) { 

                    resolve([ 

                        { id: 1, name: "Harshika", email: "harshika2208@gmail.com" }, 

                        { id: 2, name: "Siri", email: "sirimallipeddi@gmail.com" }, 

                        { id: 3, name: "Chandana", email: "chandana2014@gmail.com" },

                        { id: 1, name: "Mahesh", email: "mahesh54@gmail.com" }, 

                        { id: 2, name: "Babu", email: "babu318@gmail.com" }, 

                        { id: 3, name: "Rambabu", email: "rambabu457@gmail.com" },

                        { id: 1, name: "Prasanna", email: "prasannakilaru@gmail.com" }, 

                        { id: 2, name: "Lakshmi", email: "lakshmi2215@gmail.com" }, 

                        { id: 3, name: "Bhanu", email: "bhanu114@gmail.com" }

                    ]); 

                } else { 

                    reject("Failed to fetch users"); 

                } 

            }, 2000); 

        }); 

    } 

}; 

// UI Layer 

const UI = { 

    displayUsers(users) { 

        const userList = document.getElementById("userList"); 

        userList.innerHTML = ""; 

        users.forEach(user => { 

            const li = document.createElement("li"); 

            li.textContent = `${user.name} - ${user.email}`; 

            userList.appendChild(li); 

        }); 

    } 

}; 

// Controller Layer 

async function loadUsers() { 

    try { 

        console.log("Loading users..."); 

        const users = await UserAPI.fetchUsers(); 

        UI.displayUsers(users); 

        console.log("Users loaded successfully"); 

    } catch (error) { 

        console.error("Error:", error); 

        alert("Something went wrong!"); 

    } 

} 