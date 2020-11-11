
function Signup () {
    return (
        <form>
            <h1>Signup Page</h1>
            <label>Username:</label>
            <input
                type='text'
                name='username'
                placeholder='username'
            />
            <label>Password:</label>
            <input
                type='password'
                name='password'
                placeholder='password'
            />
            <input type='submit' />
        </form>
    );
}

export default Signup;