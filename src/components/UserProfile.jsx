import React from 'react'
import { styled } from '@mui/styles'
import userImage from '../assets/images/user.png'
const ProfileContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #444',
  marginBottom: '20px',
}))

const ProfilePicture = styled('div')(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: 6,
  backgroundColor: '#fff',
  marginRight: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  color: '#233228',
  overflow: 'hidden', // To ensure the image fits within the circle
}))

const ProfileImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // To cover the entire area of the container
})

const ProfileDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: '#ffffff',
  maxWidth: '120px', // Adjust this as necessary for your layout
}))

const ClippedText = styled('div')({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const UserProfile = ({ user }) => {
  return (
    <ProfileContainer>
      <ProfilePicture>
        <ProfileImage 
        src={userImage}
        alt='User Image'
        // src={user.imagePath}
        // alt={`${user.name}'s profile`} 
        />
      </ProfilePicture>
      <ProfileDetails>
        <ClippedText style={{color:"#57D57B",fontSize:"24px",fontWeight:"500"}}>
          Jack Smith
          {/* {user.name} */}
        </ClippedText>
        <ClippedText>
          Athletica Lead Instructor
          {/* {user.email} */}
        </ClippedText>
      </ProfileDetails>
    </ProfileContainer>
  )
}

export default UserProfile
