import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps {
    openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
        <Menu.Item header
        >
            <img style={{marginRight:10}} src="/assets/logo.png" alt="logo" />
        Reactivities
        </Menu.Item>
        <Menu.Item
          name='Activities'
        />
        <Menu.Item
         ><Button onClick={openCreateForm} positive content="create activity" />
         </Menu.Item>
        </Container>
      </Menu>
    )
}
