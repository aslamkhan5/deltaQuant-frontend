import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { defaultSpacing } from '../constants';
import { primaryColor } from '../constants/color';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const GenericBreadcrumbs = ({ breadcrumbs, currentPath }) => {
  const currentPageStyle = {
    color: primaryColor,
    fontWeight: '400',
    textDecoration: 'none',
    fontSize: "16px"
  };

  const defaultPageStyle = {
    color: 'white',
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ mb: defaultSpacing }}
      separator={<Typography sx={{ color: 'white' }}>/</Typography>}
    >
      {breadcrumbs?.map((breadcrumb, index) => {
        const isCurrentPage = currentPath === breadcrumb.href;
        const linkStyle = isCurrentPage ? currentPageStyle : defaultPageStyle;

        if (breadcrumb.href) {
          return (
            <Link
              key={index}
              component={RouterLink}
              to={breadcrumb.href}
              sx={linkStyle}
            >
              {breadcrumb.text}
            </Link>
          );
        } else {
          return (
            <Typography key={index} color="text.primary">
              {breadcrumb.text}
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default GenericBreadcrumbs;
