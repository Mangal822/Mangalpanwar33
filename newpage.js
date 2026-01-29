// Example: Fetch and display listings from Supabase
async function loadNewPageListings(){
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('active', true);

  const container = document.getElementById("newGrid");
  container.innerHTML = "";

  if(error) {
    container.innerHTML = "Error loading listings.";
    return;
  }

  data.forEach(d => {
    container.innerHTML += `
      <div class="card">
        <h3>${d.title}</h3>
        <p>${d.type} · ${d.location || "Private Location"}</p>
        <button>Request Private Viewing</button>
      </div>
    `;
  });
}

// Run the function when page loads
loadNewPageListings();
