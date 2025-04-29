(async function () {
     
     const isBrave = navigator.brave && typeof navigator.brave.isBrave === 'function'
       ? await navigator.brave.isBrave()
       : false;
   
     
     const devtoolsOpen = false;
     const threshold = 160;
   
     const detectDevTools = () => {
       const start = performance.now();
       debugger;
       const time = performance.now() - start;
       if (time > threshold) {
         devtoolsOpen = true;
         showBlocked();
       }
     };
   
     setInterval(detectDevTools, 1000);
   
     
     function showBlocked() {
       document.head.innerHTML = '';
       document.body.innerHTML = `
         <h1 style="font-family: monospace; text-align: center; margin-top: 20vh; color: #aaa;">
           404 - Not Found
         </h1>
         <p style="text-align: center; font-family: monospace; color: #666;">
           The page you are looking for might have been removed.
         </p>
       `;
       throw new Error("Access blocked.");
     }
   
     
     if (!isBrave) return showBlocked();
   
     
     document.body.innerHTML = '';
     document.title = 'Admin Panel';
   
     const heading = document.createElement('h1');
     heading.textContent = 'Admin Panel';
     heading.style.textAlign = 'center';
     heading.style.fontFamily = 'sans-serif';
     document.body.appendChild(heading);
   
     const textarea = document.createElement('textarea');
     textarea.rows = 20;
     textarea.style.width = '90%';
     textarea.style.margin = '1rem auto';
     textarea.style.display = 'block';
     textarea.style.fontFamily = 'monospace';
   
     const saveBtn = document.createElement('button');
     saveBtn.textContent = '💾 Save Projects to localStorage';
     saveBtn.style.display = 'block';
     saveBtn.style.margin = '1rem auto';
     saveBtn.style.padding = '0.7rem 1.2rem';
     saveBtn.style.fontSize = '1rem';
   
     saveBtn.onclick = () => {
       try {
         const data = JSON.parse(textarea.value);
         localStorage.setItem('projects', JSON.stringify(data));
         alert('✅ Projects saved!');
       } catch {
         alert('❌ Invalid JSON!');
       }
     };
   
     const loadBtn = document.createElement('button');
     loadBtn.textContent = '📂 Load Projects';
     loadBtn.style.display = 'block';
     loadBtn.style.margin = '0 auto';
     loadBtn.style.padding = '0.7rem 1.2rem';
     loadBtn.style.fontSize = '1rem';
   
     loadBtn.onclick = () => {
       const data = localStorage.getItem('projects');
       if (data) {
         textarea.value = data;
       } else {
         alert('⚠️ No data found.');
       }
     };
   
     document.body.appendChild(textarea);
     document.body.appendChild(saveBtn);
     document.body.appendChild(loadBtn);
   
     
     const saved = localStorage.getItem('projects');
     if (saved) textarea.value = saved;
   })();
   