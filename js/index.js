//Constants
const form = document.getElementById('github-form')
const repoList= document.getElementById('repos-list')
const userList = document.querySelector('#user-list')

//Event Listener
form.addEventListener('submit', (event) => {
    event.preventDefault()
})

//User Keyword Search
function userSearch () {
    fetch(`https://api.github.com/search/users?q=${form[0].value}`)
        .then(resp => resp.json())
        .then(resp =>  {
            userList.innerHTML =''
            repoList.innerHTML= ''
            resp.items.map(item => {
                const li = document.createElement('li')
                li.className='li-item'
                li.innerHTML = `
                <h2>${item.login}</h2>
                <img src=${item.avatar_url} />
                <button id='btn1'>User Repository List</button><br>
                <a class='button' href=${href=item.html_url}>See user profile</a>`
                li.querySelector('#btn1').addEventListener('click', e => userRepos(item.login,e))
                userList.append(li)
            })
        })
        form.reset()
    }

//Repo Keyword Search
function keywordSearch () {
    fetch(`https://api.github.com/search/repositories?q=${form[0].value}`)
    .then(resp => resp.json())
    .then(resp =>  {
        userList.innerHTML =''
        repoList.innerHTML= ''
        resp.items.map(item => {
            const li = document.createElement('li')
            li.className = 'li-item'
            let owner = item.owner.login
            li.innerHTML = `
            <h2>${item.name}</h2>
                <h3>Owner</h3>
                <h4>${owner}</h4>
                <img src=${item.owner.avatar_url} />
                <button id='btn'>Owners Full Repository List</button>`
            li.querySelector('#btn').addEventListener('click', e => userRepos(owner,e))
            userList.append(li)
        })
    })
    form.reset()
}

//Repo Search and Display
function userRepos(username,e) {
    repoList.innerHTML=''
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(resp => resp.map(repo => {
        const li = document.createElement('li')
        li.innerHTML= `
        <h1>${repo.name}</h1>`
        repoList.append(li)
    })  
    )
}


