const form = document.getElementById('github-form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(resp => resp.json())
    .then(resp =>  {
        const userList = document.querySelector('#user-list')
        userList.innerHTML =''
        const repoList= document.getElementById('repos-list')
        repoList.innerHTML= ''
        resp.items.map(item => {
            const li = document.createElement('li')
            const h2 = document.createElement('h2')
            h2.textContent = item.login
            const img= document.createElement('img')
            img.src = item.avatar_url
            const btn1= document.createElement('button')
            btn1.innerText = 'User Repository List'
            btn1.addEventListener('click', e => userRepos(item.login,e))
            const a=document.createElement('a')
            a.innerText='See user profile'
            a.className='button'
            a.href=item.html_url 
            li.append(h2,a,img,btn1)
            userList.append(li)
        })
    })
    form.reset()
})

function userRepos(username,e) {
    const repoList= document.getElementById('repos-list')
    repoList.innerHTML=''
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(resp => resp.map(repo => {
        const li = document.createElement('li')
        const h1 = document.createElement('h1')
        h1.textContent = repo.name
        const repoList= document.getElementById('repos-list')
        li.append(h1)
        repoList.append(li)
    })  
    )
}
const formKeyword = document.getElementById('github-form-keyword')
formKeyword.addEventListener('submit', (event) => {
    event.preventDefault()
    fetch(`https://api.github.com/search/repositories?q=${event.target[0].value}`)
    .then(resp => resp.json())
    .then(resp =>  {
        const userList = document.querySelector('#user-list')
        userList.innerHTML =''
        const repoList= document.getElementById('repos-list')
        repoList.innerHTML= ''
        resp.items.map(item => {
            const li = document.createElement('li')
            const h2 = document.createElement('h2')
            const h3=document.createElement('h3')
            const h4=document.createElement('h4')
            h2.textContent = item.name
            let owner = item.owner.login
            h3.textContent = `Owner:`
            h4.textContent= owner
            const img= document.createElement('img')
            img.src = item.owner.avatar_url
            const btn= document.createElement('button')
            btn.innerText = 'Owners Full Repository List'
            btn.addEventListener('click', e => userRepos(owner,e))
            li.append(h2,h3,h4,img,btn)
            userList.append(li)
        })
    })
    form.reset()
})

