import React, { Fragment, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel, Grid, Button } from '@mui/material';

const ActivateCheckbox = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', checked: false },
        { id: 2, name: 'Item 2', checked: false },
        { id: 3, name: 'Item 3', checked: false },
        { id: 4, name: 'Item 4', checked: false },
    ]);

    const handleToggle = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleSelectAll = () => {
        const allSelected = items.every(item => item.checked);
        setItems((prevItems) =>
            prevItems.map((item) => ({ ...item, checked: !allSelected }))
        );
    };

    return (
        <Fragment>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2, mt: 2 }}>
                <FormLabel component="legend" sx={{ color: "white" }}>Deactivate Bots</FormLabel>
                <FormLabel
                    component="legend"
                    sx={{ color: "#57D57B", cursor: 'pointer' }}
                    onClick={handleSelectAll}
                >
                    Select All
                </FormLabel>
            </Grid>
            <FormGroup>
                {items.map((item) => (
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
                        <FormControlLabel
                            key={item.id}
                            control={
                                <Checkbox
                                    checked={item.checked}
                                    sx={{ color: "white" }}
                                    onChange={() => handleToggle(item.id)}
                                />
                            }
                            label={
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <span>{item.name}</span>
                                </div>
                            }
                        />

                        <span style={{ textAlign: "right" }}>{item.checked ? 'Activated' : 'Deactivated'}</span>
                    </div>
                ))}
            </FormGroup>
            <div style={{ textAlign: "center" }}><Button sx={{ background: "#4A4F4B", color: "white" }}>Activate</Button></div>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
                <Grid item>
                    <FormLabel component="legend" sx={{ color: "white" }}>Active Bots</FormLabel>
                </Grid>
                <Grid item>
                    <FormLabel
                        component="legend"
                        sx={{ color: "#57D57B", cursor: 'pointer' }}
                        onClick={handleSelectAll}
                    >
                        Select All
                    </FormLabel>
                </Grid>
            </Grid>
            <FormGroup>
                {items.map((item) => (
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
                        <FormControlLabel
                            key={item.id}
                            control={
                                <Checkbox
                                    checked={item.checked}
                                    sx={{ color: "white" }}
                                    onChange={() => handleToggle(item.id)}
                                />
                            }
                            label={
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <span>{item.name}</span>
                                </div>
                            }
                        />

                        <span style={{ textAlign: "right" }}>{item.checked ? 'Activated' : 'Deactivated'}</span>
                    </div>
                ))}
            </FormGroup>
            <div style={{ textAlign: "center" }}><Button sx={{ background: "#4A4F4B", color: "white" }}>Deactivate</Button></div>
        </Fragment>
    );
};

export default ActivateCheckbox;
