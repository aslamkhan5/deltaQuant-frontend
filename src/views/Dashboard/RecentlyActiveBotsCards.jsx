import React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Info from '@mui/icons-material/Info';
import { defaultSpacing } from '../../constants'
const RecentlyActiveBotsCards = ({ data }) => {
  return (
    <Grid container spacing={2} sx={{ mb: defaultSpacing }}>
      {data.map((item, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={3} xl={3}>
          <Card sx={{ background: "#202020", position: 'relative' }}>
            <CardContent sx={{ display: 'flex', alignItems: "center" }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: 5,
                  backgroundColor: '#57D57B',
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: "600", fontSize: "24px", whiteSpace: 'nowrap', textOverflow: 'ellipsis', }}>
                  {item?.title}
                </Typography>
                <Typography sx={{ fontWeight: "400", fontSize: "16px" }}>{item?.subTitle}</Typography>
                <Typography sx={{ fontWeight: "400", fontSize: "16px", whiteSpace: 'nowrap', textOverflow: 'ellipsis', }}>
                  {item?.time}
                </Typography>
              </Box>
              <Info item={item} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default RecentlyActiveBotsCards