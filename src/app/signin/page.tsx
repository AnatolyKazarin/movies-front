'use client';

import { Checkbox, CheckboxProps, Input, notification } from 'antd';
import { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { LoginButton } from '@/app/signin/components/LoginButton';
import { SignInButton } from '@/app/signin/components/SignInButton';
import { inputStyle } from '@/constants/styles';

export default function SignIn() {
  const [notify, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);

  const onChange: CheckboxProps['onChange'] = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="width-full flex h-[calc(100vh-111px)] flex-1 items-center justify-center">
      {contextHolder}
      <main className="flex w-80 flex-col items-center justify-center gap-6 self-center">
        <h1 className="text-4xl font-semibold sm:text-6xl">Sign In</h1>
        <Input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input.Password
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeOutlined style={{ color: 'white' }} /> : <EyeInvisibleOutlined style={{ color: 'white' }} />
          }
        />
        <Checkbox style={{ color: 'white' }} checked={checked} onChange={onChange}>
          {'Remember me'}
        </Checkbox>
        <LoginButton notify={notify} email={email} password={password} />
        <SignInButton notify={notify} email={email} password={password} />
      </main>
    </div>
  );
}
