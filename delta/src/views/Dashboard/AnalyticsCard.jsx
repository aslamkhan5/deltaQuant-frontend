import React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { dashboardCard } from '../../utils/images'
import currency from '../../constants/currency'
import { defaultSpacing } from '../../constants'

const AnalyticsCard = ({ data }) => {
  const getColor = (percentage) => {
    if (percentage >= 0.5) {
      return "#408E56"
    } else {
      return "#EF4D56"
    }
  }
  return (
    <Grid container spacing={2} sx={{ mb: defaultSpacing }}>
      {data.map((item, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={3} xl={3}>
          <Card sx={{ background: "#202020" }}>
            <CardContent sx={{ position: 'relative' }}>
              <Typography sx={{ fontWeight: "700", fontSize: "40px", whiteSpace: 'nowrap', textOverflow: 'ellipsis', }}>
                {currency}{item?.price}
              </Typography>
              <Typography sx={{ my: 2, whiteSpace: 'nowrap', textOverflow: 'ellipsis', }}>{item?.title}</Typography>
              <Typography sx={{ fontWeight: "600", fontSize: "20px", color: getColor(item?.percentage), whiteSpace: 'nowrap', textOverflow: 'ellipsis', }}>
                {item?.percentage}% <span style={{ fontWeight: "500", fontSize: "20px", color: "white" }}>{item?.additionalText}</span>
              </Typography>
              <Box
                component="img"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: 80,
                  // width: 150,
                  objectFit: 'contain',
                }}
                alt="card with circle"
                src={dashboardCard}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default AnalyticsCard