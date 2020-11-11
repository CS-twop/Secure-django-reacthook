import './Signup.css';

function Signup () {
    return (
        <div className='page'>
            <div className='signup-box'>
                <form>
                    <div className='sigup-header'>web/signup.</div>
                    <div className='signup-subbox' id='usrn'>
                        <label className='label'>Username:</label>
                        <input
                            className='input-authen'
                            type='text'
                            name='username'
                            placeholder='Put your nice name'
                        />
                    </div>
                    <div className='signup-subbox' id='pwd'>
                        <label className='label'>Password:</label>
                        <input
                            className='input-authen'
                            type='password'
                            name='password'
                            placeholder='Put your secure password'
                        />
                    </div>
                    <div className='signup-btn-subbox'>
                        <input className='signup-btn' type='submit' value='sign up' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;