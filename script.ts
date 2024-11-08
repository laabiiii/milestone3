document.getElementById('resumeForm')?.addEventListener('submit' , function (event) {
    event.preventDefault();


    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    
    // type assertion
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;

    
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

     

        // picture Elements
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";



    //create resume Output    
        const resumeHTML = `
           <h2>Resume</h2>
           ${profilePictureURL ? `<img src = "${profilePictureURL}" alt ="Profile Picture" class = "profilePicture">` : "" }
           <p><strong>Name:</strong>  ${name} </p>
           <p><strong>Email:</strong> ${email} </p>
           <p><strong>Phone:</strong> ${phone} </p>

           <h3>Education</h3>
           <p >${education}</p>

           
           <h3>Experience</h3>
           <p>${experience}</p>

           
           <h3>skills</h3>
           <p>${skills}</p>
        `;

         //*********************************************************************/
        //  display the resume in the out put container
         const resumeOutputElement = document.getElementById("resumeOutput");
         if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeHTML;
            resumeOutputElement.classList.remove("hidden");

         //create container for buttons
         const buttonsContainer = document.createElement("div")
         buttonsContainer.id = "buttonsContainer";
         resumeOutputElement.appendChild(buttonsContainer);

        // add download PDF buttons
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
            window.print(); //open the print dialog, allowing user to save as PDF
        });
        buttonsContainer.appendChild(downloadButton);
            
        // add shareanle link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "copy shareable Link";
        shareLinkButton.addEventListener("click", async ()=>{
            try{
                //create a unique shareable link (simulate it in this case)
                const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, "_")}_cv.html`;

                //use clipboard Api to copy the shareable link
                await navigator.clipboard.writeText(shareableLink);
                alert("shareable link copied to clipboard!"); 
            } catch(err) {
                console.error("Failed to copy link:", err);
                alert("Failed to copy link to clipboard. Please try again.");
            }
        });
            buttonsContainer.appendChild(shareLinkButton);
         } else {
            console.error("resume output container not found");
         }
          }  else {
            console.error("Form elements are missing");
         }

        });