const { useState } = React;
const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  //const [Token, setToken] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [ColorContent,setColorContent] =  useState('');
  const [DisplayState,setDisplayState] =  useState('');
 const loginButtonCaption = DisplayState === 'none' ? "Press Me" : "Login";
  const handleSubmit = async (e) => {
    e.preventDefault();
 const url = 'https://slnyr83a29.execute-api.us-west-1.amazonaws.com/default/subscribers';
    try {
      const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) 
      {
        const data = await response.json();
        if(data.statusCode === 200)
        {
          const authToken = data.token; // Assuming the token property name is "token"
          const fullName = data.fullname;
          setResult('Authentication successful\nHello ' + fullName + '\nPlease wait for the Image to be loaded');
          //setToken(authToken); // Store the token in state for further use
          setColorContent('green');
          setDisplayState('none');
          // Make a new request with the token
          const htmlResponse = await fetch(url , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: authToken }),
          });
          if (htmlResponse.ok) 
          {
            const htmlData = await htmlResponse.json();
            setHtmlContent(htmlData.body);
            setResult('Authentication successful\nHello ' + fullName  + '\nPress the button to change picture');
          } 
          else 
          {
            setHtmlContent('Failed to load HTML content');
          }
      } 
      else 
      {
        setResult('Authentication failed');
        setColorContent('red');
        setHtmlContent('');
      }
    } 
  }
    catch (error) {
      console.error('Error:', error);
      setResult('An error occurred.'+ error);
      setHtmlContent('');
      setColorContent('red');
    }
  };
  const sentences = result.split('\n');
 return (
    React.createElement('div', null,
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { style: { textAlign: 'center' } },
              React.createElement('details', { style: { textAlign: 'center' } },
                    React.createElement('summary', { style: { paddingLeft: 'auto', paddingRight: 'auto', textAlign: 'left', fontSize: '1.5rem', color: 'Violet' } }, 'About the Site'),
          React.createElement('h2', { style: {paddingLeft: 'auto', paddingRight: 'auto', textAlign: 'left', color: 'cyan' } }, "Welcome to Y.D's Experimental site"),
          React.createElement('h2', { style: { paddingLeft: 'auto', paddingRight: 'auto', textAlign: 'left',color: 'darkgoldenrod' } }, "Do you know that you can let your parrot hear himself speak?")
                                  )
        ),
        React.createElement('div', { style: { textAlign: 'center', color: ColorContent } },
          React.createElement('h3', { style: { color: 'green', display: DisplayState } }, "Please enter your login to make the magic"),
          React.createElement('div', null,
            React.createElement('label', { style: { color: 'white' , display: DisplayState}, htmlFor: 'username' }, "User Name:"),
            React.createElement('input', { style: {display: DisplayState}, type: 'text', id: 'username', value: username, onChange: (e) => setUsername(e.target.value) })
          ),
          React.createElement('div', null,
            React.createElement('label', { style: { color: 'white', display: DisplayState }, htmlFor: 'password' }, "Password:"),
            React.createElement('input', { style: {display: DisplayState}, type: 'password', id: 'password', value: password, onChange: (e) => setPassword(e.target.value) })
          ),
          React.createElement('button', { type: 'submit' }, loginButtonCaption),
          React.createElement('button', { style: {display: DisplayState}, type: 'submit', onClick: () => 
                                        { window.location.href = 'https://liquidbacket.s3.us-west-1.amazonaws.com/SignUp.html'; }}, "Sign Up")
        )
      ),
      //React.createElement('div', { style: { textAlign: 'center', color: ColorContent }}, result),
      React.createElement('div', { style: { textAlign: 'center', color: ColorContent }}, 
                          result.split('\n').map((line, index) => (React.createElement('p', { key: index }, line)))),
      htmlContent && React.createElement('div', { style: { textAlign: 'right' }, dangerouslySetInnerHTML: { __html: htmlContent } })
    )
   );
};

// Use ReactDOM.render to render the App component to the root element
ReactDOM.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(App, null)
  ),
  document.getElementById('root')
);
export default App;
