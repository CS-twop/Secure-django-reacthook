import './Signin.css';

function Signin () {
    return (
        <div className='page'>
            <div className='signin-box'>
                <form>
                    <div className='signin-header'>web/signin.</div>
                    <div className='signin-subbox' id='usrn'>
                        <label className='label'>Username:</label>
                        <input
                            autocomplete='off'
                            className='input-authen'
                            type='text'
                            name='username'
                            placeholder='Put your nice username'
                        />
                    </div>
                    <div className='signin-subbox' id='pwd'>
                        <label className='label'>Password:</label>
                        <input
                            className='input-authen'
                            type='password'
                            name='password'
                            placeholder='Put your secure password'
                        />
                    </div>
                    <div className='signin-btn-subbox'>
                        <input className='signin-btn' type='submit' value='sign in' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;