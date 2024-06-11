import { Button, Grid, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';
import { connection } from '../../routes/pathName';
import GenericModal from '../../components/GenericModal';
import CreatePaperTradingAccountForm from './CreatePaperTradingAccountForm';
import { toast } from 'react-toastify';
import ConnectionTable from './ConnectionTable';

const Connection = () => {
    function createData(account, broker, status, availableBalance,buyingOption,id) {
        return { account, broker, status, availableBalance,buyingOption,id };
    }
    const rows = [
        createData('Premium', 'Premium', 'Premium', '--', 'Premium',1),
        createData('Premium', 'Premium', 'Premium', '--', 'Premium',2),
        createData('Premium', 'Premium', 'Premium', '--', 'Premium',3),
        createData('Premium', 'Premium', 'Premium', '--', 'Premium',4),
        createData('Premium', 'Premium', 'Premium', '--', 'Premium',5),
        createData('Premium', 'Premium', 'Premium', '--', 'Premium',6),
        createData('Premium', 'Premium', 'Premium', '--', 'Premium',7),
        createData('Premium', 'Premium', 'Premium', '--', 'Premium',8),
      ];

    const [formData, setFormData] = useState({
        initialBalance: '',
        accountName: '',
        currency: '',
    });
    const [isCreateBotModalOpen, setIsCreateBotModalOpen] = useState(false)
    const breadcrumbItems = [
        { text: 'Home', href: '/' },
        { text: 'Connection', href: connection },
    ];

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        // Clear the error for the field being changed
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }))
    }

    const validate = () => {
        let tempErrors = {}
        if (!formData.initialBalance) tempErrors.initialBalance = "Initial Balance is required"
        if (!formData.accountName) tempErrors.accountName = "Account Name is required"
        if (!formData.currency) tempErrors.currency = "Currency is required"
        setErrors(tempErrors)
        return Object.keys(tempErrors).length === 0
    }

    const handleCreateBotClose = () => {
        setIsCreateBotModalOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            toast.success("Form Submitted")
            handleCreateBotClose()
            setFormData({
                initialBalance: '',
                accountName: '',
                currency: '',
            })
        }
    }
    return (
        <Fragment>
            <Typography
                mb={2}
                color="#FFFFFF"
                sx={{ fontWeight: 400, fontSize: 16 }}
            >
                Onto Connection
            </Typography>

            <Grid container justifyContent="space-between">
                <Grid item>
                    <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={connection} />
                </Grid>
                <Grid item>
                    <Button sx={{ background: '#233228', mr: 1 }} onClick={() => setIsCreateBotModalOpen(true)}>Create Paper Trading Account</Button>
                    <Button sx={{ background: '#233228', mr: 1 }} >Link Account</Button>
                    <GenericModal showActionButton open={isCreateBotModalOpen} handleClose={handleCreateBotClose} title="Create Paper Trading Account" handleSubmit={handleSubmit}>
                        <CreatePaperTradingAccountForm
                            initialBalance={formData.initialBalance}
                            accountName={formData.accountName}
                            currency={formData.currency}
                            handleChange={handleChange}
                            errors={errors}
                        />
                    </GenericModal>
                </Grid>
            </Grid>
            <ConnectionTable rows={rows}/>
        </Fragment>
    )
}

export default Connection