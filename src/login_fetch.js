const login = async (username, password) => {
    const data = {
      username: username,
      password: password
    };
  
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.status === 200) {
        const result = await response.json();
        // 서버로부터 받은 토큰을 로컬스토리지에 저장
        localStorage.setItem('authToken', result.token);
        console.log('Token saved:', result.token);
        // 로그인 성공 시 추가로 수행할 작업이 있으면 여기에 작성
      } else if (response.status === 401) {
        const errorResult = await response.json();
        console.error('Login failed:', errorResult.message);
      } else {
        console.error('Unexpected error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
