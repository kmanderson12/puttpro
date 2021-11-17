import { useRouter } from 'next/router';
import {
  Avatar,
  Flex,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useQueryClient, useMutation } from 'react-query';
import { useEffect, useRef, useState } from 'react';

const UpdateUser = ({ user, isOpen, onClose }) => {
  const router = useRouter();

  const [userProfile, setUserProfile] = useState({
    name: user.name || '',
    location: user.location || '',
    imageURL: user.imageURL || '',
  });

  const [imageUpload, setImageUpload] = useState({
    isFetching: false,
  });

  const fileInput = useRef(null);

  const uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'puttpro');

    setImageUpload({
      isFetching: true,
    });

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/kmanderson12/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    setImageUpload({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      isFetching: false,
    });
    setUserProfile({
      ...userProfile,
      imageURL: file.secure_url,
    });
  };

  useEffect(() => {
    setUserProfile({
      name: user.name,
      location: user.location,
      imageURL: user.imageURL,
    });
  }, [user]);

  function handleChange(e) {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  }

  const updateProfileMutation = (data) => {
    return fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(updateProfileMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('userData');
    },
  });

  function handleSubmit(e) {
    mutation.mutate(userProfile);
    onClose();
  }

  function handleAvatarClick() {
    fileInput.current.click();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" alignItems="center">
            {imageUpload.isFetching ? (
              <p>Loading image...</p>
            ) : imageUpload.image ? (
              <Avatar size="2xl" src={imageUpload.image} alt="Upload Preview" />
            ) : (
              <Avatar
                size="2xl"
                src={user.imageURL}
                alt="Upload Preview"
                onClick={handleAvatarClick}
                cursor="pointer"
              />
            )}
            <input
              style={fileInputStyles}
              ref={fileInput}
              type="file"
              id="file"
              name="file"
              placeholder="File"
              onChange={uploadFile}
            />
          </Flex>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={userProfile.name} onChange={handleChange} />
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            value={userProfile.location}
            onChange={handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const fileInputStyles = {
  position: 'absolute',
  height: '1px',
  width: '1px',
  top: '-1000px',
  left: '-1000px',
  opacity: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  visibility: 'hidden',
};

export default UpdateUser;
