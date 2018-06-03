import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer, deleteFormFromServer, deleteUserOrganizationFromServer } from '../../store';
import AddUserForm from '../User/AddUserForm';
import { Link } from 'react-router-dom';

const OrgUsers = ({ organization, id, ownUsers, removeUser, userOrganizations }) => {
  if (!organization) return null
  return (
    <div>
      <h2>My Users</h2>
      <ul>
      {
        ownUsers.map(user => (
          <div>
          <li key={user.id}>
            {user.fullName+' '}
            <Link to={`/users/${user.id}`}><button className='tiny olive ui button'>Edit user</button></Link>
            <button className='tiny orange ui button' onClick={() => removeUser(user.id, organization.id, userOrganizations)}>Remove from {organization.name}</button>
          </li>
          <br></br>
          </div>
        ))
      }
      </ul>
      <div className="ui hidden divider"></div>
      <AddUserForm organization={organization} />
    </div>
  );
}

const mapState = ({ organizations, users, userOrganizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownUsers = userOrganizations.reduce((memo, userOrg) => {
    const user = users.find(user => user.id === userOrg.userId && id === userOrg.organizationId)
    if (!memo.includes(user) && user) {
      memo.push(user)
    }
    return memo;
  }, [])
  return { organization, ownUsers, userOrganizations }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    removeUser: (userId, organizationId, userOrgs) => {
      const userOrg = userOrgs.find(userOrg => userOrg.userId === userId && userOrg.organizationId === organizationId)
      dispatch(deleteUserOrganizationFromServer(userOrg.id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrgUsers);
