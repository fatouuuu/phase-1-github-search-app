document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault()
        searchUsers()
    })
});

function searchUsers() {
    const search = document.getElementById("search")
    fetch(`https://api.github.com/search/users?q=${search.value}`)
    .then(resp => resp.json())
    .then(json => {
        for (const users of json.items) {
            const reposList = document.createElement("li")
            reposList.innerHTML = `
            <h3>Username: ${users.login}</h3>
            <img src= ${users.avatar_url} alt=${users.login}'s avatar>
            <a href=${users.url}>${users.login}'s Github</a>
            `
            reposList.id = users.login
            reposList.addEventListener("click", () => searchUserRepos(users.login))
            document.getElementById("user-list").appendChild(reposList)
        }
    })
};

function searchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(json => {
        const repositoriesList = document.getElementById("repos-list")
        repositoriesList.innerHTML=" "
        for(const username of json) {
            const repoListAppend = document.createElement("li")
            repoListAppend.innerHTML = `<a href=${username["html_url"]}>${username["html_url"]}</a>`
            repositoriesList.appendChild(repoListAppend)
        }
    })
};