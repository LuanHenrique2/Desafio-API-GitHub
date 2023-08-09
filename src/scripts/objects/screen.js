const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="foto do perfil do usuário" />
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                <p>Seguidores ${user.followers} 👥</p>
                                <p>Seguindo ${user.following} 👣</p>
                            </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            const forks = repo.forks ?? 0;
            const stargazers = repo.stargazers_count ?? 0;
            const watchers = repo.watchers ?? 0;
            const language = repo.language ?? ' ';

            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank"> ${repo.name}</a>
                                <ul class="details">
                                    <li>🍴${forks}</li>
                                    <li>🌟${stargazers}</li>
                                    <li>👀${watchers}</li>
                                    <li>💠${language}</li>
                                </ul>
                              </li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositories</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }


        let eventsList = ''
        let messages = '' 

    user.eventsList.forEach(event => {

        if (event.payload.commits) {
            event.payload.commits.forEach(element => {
                messages = `${element.message}`
            })
        }
        eventsList += `<li class="eventList"><p>${event.repo.name}<spam class="commit">- ${messages}</spam></p></li>`;
    })

    this.userProfile.innerHTML += `<div class="events"
                                        <h2>Eventos</h2>
                                        <ul class="list">${eventsList}</ul>
                                  </div>`

        },

        renderNotFound(){
            this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
        }

    }

export { screen }