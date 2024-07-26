// (function() {
//   if (document.querySelectorAll(".work-card"))
//     document.querySelectorAll(".work-card").forEach((el) => {
//       el.addEventListener('mousemove', (e) => {
//         const rect = e.target.getBoundingClientRect()
//         let x = e.clientX - rect.left
//         let y = e.clientY - rect.top
//         let rightBorder = el.offsetWidth - 60
//         let bottomBorder = el.offsetHeight - 60

//         if (x < 60) {
//           x = 60
//         }

//         if (x > rightBorder) {
//           x = rightBorder
//         }

//         if (y < 60) {
//           y = 60
//         }

//         if (y > bottomBorder) {
//           y = bottomBorder
//         }

//         gsap.to(el.children[2], {
//           opacity: 1,
//           x,
//           y,
//           duration: 0.3
//         })
//       })

//       el.addEventListener('mouseleave', (e) => {
//         gsap.to(el.children[2], {
//           opacity: 0,
//           duration: 0.3
//         })
//       })
//     })
// })();
