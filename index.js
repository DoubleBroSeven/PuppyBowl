const renderPlayers = async () => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-FTB-ET-WEB-FT/teams`);
  const readableResponse = await response.json();
  const Players = readableResponse.data;
  const teams = Players.teams; 
  const bodySection = document.querySelector(`section`);

  bodySection.innerHTML = '';

  teams.forEach(team => {
    const teamSection = document.createElement('section');
    teamSection.innerHTML = `<h3>${team.name}</h3>`;
    
    const teamPlayers = team.players;

    if (teamPlayers.length === 0) {
      teamSection.innerHTML += `<p>No players in this team.</p>`;
    } else {
      const playersList = document.createElement('section');

      teamPlayers.forEach(player => {
        const playerSection = document.createElement('section');
        playerSection.innerHTML = `
          <img height="250px" width="250px" src="${player.imageUrl}" alt="${player.breed}">
          <h4>${player.name}</h4>
        `;
        
        playerSection.addEventListener('click', () => {
          bodySection.innerHTML = `
            <h2>${player.name}</h2>
            <img height="400px" width="400px" src="${player.imageUrl}" alt="${player.breed}">
            <h4>Breed:</h4><p>${player.breed}</p>
            <h4>Status:</h4><p>${player.status}</p>
            <button id="backButton">Back</button>
          `;

          const backButton = document.getElementById('backButton');
          backButton.addEventListener('click', () => {
            renderPlayers();
          });
        });

        playersList.append(playerSection);
      });
      teamSection.append(playersList);
    }
    bodySection.append(teamSection);
  });
};

renderPlayers();
