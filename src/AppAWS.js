import React, { useState } from 'react';

const MyComponent = () => {
  const [token, setMessage] = useState('');

  const generateToken = async (event) => {
    event.preventDefault();
    const url = 'https://8wc7wgc2li.execute-api.us-west-1.amazonaws.com/TOKEN/TokenService'; // Replace with your API endpoint
    
	//const requestBody = { value: 'blabla' }; // Replace with your request body
	const sk = document.getElementById("txtSecretKey");
	var element = document.getElementsByTagName("div")[1];
	if (sk) 
	{
		const requestBody = {value: sk.value};
        let response;
		try
		{
		 response = 
			await fetch(url, {
								method: 'POST',
								headers: {
											'Content-Type': 'application/json',
										 },
										body: JSON.stringify(requestBody)
							  });
							    if (!response.ok) 
								{
                                 setMessage(response.statusText);
								 element.style.color = "red";
                               }
		} 
		catch (error) {console.log('Error:', error);}
		if (response) 
		{
		 const data = await response.json();
		 if(response.ok)
		 {
		 setMessage(data.token); // Assuming the response returns a token field
		 element.style.color = "green";
		 }
		 else
		 {
			 setMessage(response.statusText);
			 element.style.color = "red";
		}
	  }		
  }
  }
  return (
      <form>
		<label id="lblSecretKey">Secret Key:</label>
		<input type="text" id="txtSecretKey"/><br></br><br></br>
	  	<button onClick={generateToken}>Generate Token with React</button>
		<div>{token}</div>
	  </form>
  );
};

export default MyComponent;

/*
try {
    let response = await fetch(url, {
      method: "POST",
								headers: {
											'Content-Type': 'application/json',
										 },
										body: JSON.stringify(requestBody)
							  });
} catch(error) {
    // Error handling here!
}
*/