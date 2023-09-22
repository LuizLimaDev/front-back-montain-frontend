import { Modal, Stack } from '@mui/material';
import { forwardRef, useContext, useEffect } from 'react';
import { ModalsContext } from '../../../context/ModalsContext';
import { SingContext } from '../../../context/SingContext';
import api from '../../../services/api';
import Form from './Form';
import Sucess from './Sucess';

function EditUserModal() {
  const {
    openModalEditUser,
    setName,
    setEmail,
    handleCloseEditUser,
    editFinished, SetEditFinished
  } = useContext(ModalsContext)
  const { value, setReceivedEmail } = useContext(SingContext)

  async function userGetDataInfo() {
    try {
      const { data } = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${value}`
        }
      })

      setName(data.name)
      setEmail(data.email)
      setReceivedEmail(data.email)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    userGetDataInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const SuccessComponent = forwardRef((props, ref) => {
    return <Sucess {...props} ref={ref} />
  })
  const FormComponent = forwardRef((props, ref) => {
    return <Form {...props} ref={ref} />
  })

  return (
    <Stack>
      <Modal
        open={openModalEditUser}
        onClose={handleCloseEditUser}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          width: "100%",
          height: "100%",
        }}
      >
        {
          editFinished ?
          <SuccessComponent />
          : <FormComponent SetEditFinished={SetEditFinished} />
        }
      </Modal>
    </Stack >
  );
}

export default EditUserModal;