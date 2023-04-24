// export const getAvgStats = async (id) => {
//   const overallStats = document.querySelectorAll(".avgTeam-stats dd");
//   const teamImg = document.querySelector(".avgTeam-image img");
//   const team = document.querySelector(".avgTeam-info h2");
//   const teamForm = document.querySelector(".avgTeam-info .team-form");
//   const color = { L: "red", D: "grey", W: "green" };

//   try {
//     const res = await axios({
//       method: "GET",
//       url: `/api/v1/fixture/getAverageStats?team=${id}`,
//     });

//     team.lastChild.textContent = res.data.team;

//     const data = res.data.result[0];

//     teamForm.textContent = "";

//     for (const [index, el] of Object.entries(data.Form)) {
//       if (index > 9) break;
//       const html = `<div class="form-indicator" style="background-color:${color[el]};"> </div>`;

//       teamForm.insertAdjacentHTML("beforeend", html);
//     }

//     overallStats[0].textContent = data.Played;
//     overallStats[1].textContent = data.Wins;
//     overallStats[2].textContent = data.Losses;
//     overallStats[3].textContent = data.GF;

//     teamImg.src = `/img/${res.data.team.replace(/\s/g, "")}.png`;

//     const keys = Object.keys(data.avgStats).map((el) => el);
//     const values = Object.values(data.avgStats).map((el) => el);
//     const randomColor = randomRGBA();

//     const chartData = {
//       labels: keys,
//       datasets: [
//         {
//           label: res.data.team,
//           data: values,
//           borderColor: `rgba(${randomColor.join(",")})`,
//           backgroundColor: transparentize(...randomColor),
//         },
//       ],
//     };

//     const chartExist = Chart.getChart("averageStats"); // <canvas> id
//     if (chartExist) chartExist.destroy();

//     new Chart(document.getElementById("averageStats"), {
//       type: "radar",
//       data: chartData,
//       options: {
//         responsive: true,
//         plugins: {
//           title: {
//             display: false,
//             text: "Average Stats this season:",
//           },
//           legend: {
//             display: false,
//           },
//         },
//       },
//     });
//   } catch (err) {
//     showAlert("error", "error getting details");
//   }
// };
