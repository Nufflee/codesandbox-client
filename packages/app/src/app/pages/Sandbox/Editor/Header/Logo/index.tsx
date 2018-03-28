import * as React from 'react';

import LogoIcon from 'common/components/Logo';

import { Container, Title } from './elements';

<<<<<<< HEAD:packages/app/src/app/pages/Sandbox/Editor/Header/Logo/index.js
export default ({ title }) => (
  <Container id="logo" href="/">
=======
type Props = {
  title: string
}

const Logo: React.SFC<Props> = ({ title }) => (
  <Container href="/">
>>>>>>> More refactoring and changed to tslint:packages/app/src/app/pages/Sandbox/Editor/Header/Logo/index.tsx
    <div style={{ position: 'relative', display: 'flex' }}>
      <LogoIcon title="CodeSandbox" width={30} height={30} />
    </div>
    <Title>{title || 'Editor'}</Title>
  </Container>
);

export default Logo
