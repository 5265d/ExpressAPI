document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("end_date").value;
    const resultsTable = document.createElement("table"); 
    const resultsSection = document.getElementById("results");

    try {
      const response = await fetch(
        `/api?start_date=${startDate}&end_date=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
      }
      const data = await response.json();

      resultsSection.innerHTML = "";

      const tableHeader = `<tr>
                                <th>ID</th>
                                <th>Item</th>
                                <th>Quantidade</th>
                                <th>Entrada</th>
                                <th>Saída</th>
                             </tr>`;
      resultsTable.innerHTML = tableHeader;

      data.forEach((item) => {
        const entrada = new Date(item.datalote).toLocaleDateString("pt-BR"); 
        const saida = new Date(item.datavenda).toLocaleDateString("pt-BR"); 
        const row = `<tr>
                            <td>${item.id}</td>
                            <td>${item.item}</td>
                            <td>${item.quant}</td>
                            <td>${entrada}</td>
                            <td>${saida}</td>
                         </tr>`;
        resultsTable.innerHTML += row;
      });

      resultsSection.appendChild(resultsTable);
    } catch (error) {
      console.error(error);
      resultsSection.textContent = "Erro ao buscar os dados";
    }
  });
