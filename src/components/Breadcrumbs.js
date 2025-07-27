import BreadcrumbsMui from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { styled } from '@mui/system';

const Separator = styled('span')({
  padding: '0 5px',
  color: 'black',
});

const StyledBreadcrumbs = styled(BreadcrumbsMui)({
  marginTop: '50px',
  marginLeft: '50px',
});

const StyledLink = styled(Link)(({ isLast }) => ({
  color: 'black',
  textDecoration: 'none',
  position: isLast ? 'relative' : 'static',
  zIndex: isLast ? 1 : 'auto',
  '&:hover, &:focus': {
    textDecoration: 'none',
    color: 'black',
  },
  ...(isLast && {
    fontWeight: 'bold',
  }),
}));

const Breadcrumbs = ({ paths }) => {
  if (!paths || paths.length === 0) {
    return (
      <StyledBreadcrumbs separator={<Separator>/</Separator>}>
        <StyledLink href="/" isLast>
          Home
        </StyledLink>
      </StyledBreadcrumbs>
    );
  }

  const activePath = paths[paths.length - 1];

  return (
    <div style={{ display: 'flex', height: '160px', overflow: 'hidden' }}>
      <div
        style={{
          width: '65%',
          backgroundColor: '#f7bf0f',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontSize: '26px',
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
        }}
      >
        <div style={{ marginLeft: '50px', marginTop: '50px', position: 'relative' }}>
          <StyledLink href={activePath.link} isLast>
            {activePath.label}
          </StyledLink>
        </div>

        <div style={{
          display: 'flex',
          position: 'relative',
          bottom: '40px'
        }}>
          <StyledBreadcrumbs separator={<Separator>/</Separator>}>
            {paths.map((path, index) => (
              <StyledLink key={index} href={path.link} isLast={index === paths.length - 1}>
                {path.label}
              </StyledLink>
            ))}
          </StyledBreadcrumbs>
        </div>
      </div>

      <div
        style={{
          width: '35%',
          background: `url("/breadcrumb-bg.png") center/cover no-repeat`,
          backgroundSize: 'cover',
          clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      ></div>
    </div>
  );
};

export default Breadcrumbs;

// import BreadcrumbsMui from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import { styled } from '@mui/system';

// const Separator = styled('span')({
//   padding: '0 5px',
//   color: 'black',
// });

// const StyledBreadcrumbs = styled(BreadcrumbsMui)(({ theme }) => ({

//   marginTop: '50px ! important',
//   marginLeft: '50px'

// }));

// const StyledLink = styled(Link)(({ theme, isLast }) => ({
//   color: 'black',

//   textDecoration: 'none',
//   position: isLast ? 'relative' : 'static',
//   zIndex: isLast ? 1 : 'auto',
//   '&:hover, &:focus': {
//     textDecoration: 'none',
//     color: 'black',
//     // fontWeight: 'bold',
//   },
//   ...(isLast && {
//     fontWeight: 'bold',
//   }),
// }));

// const Breadcrumbs = ({ paths }) => {
//   if (!paths || paths.length === 0) {
//     return (
//       <StyledBreadcrumbs separator={<Separator>/</Separator>} >
//         <StyledLink href="/" isLast>
//           Home
//         </StyledLink>
//       </StyledBreadcrumbs>
//     );
//   }

//   const activePath = paths[paths.length - 1];

//   return (

//     <div style={{
//       background: `url('https://www.empoweringsmallbusiness.org/sites/default/files/styles/ifde_hero/public/images/2023-05/Inclusive%20III%20%26%20Movie%20Theater%20Headers%20%281%29.png?h=d1cb525d&itok=Q3iPaz3d') center/cover no-repeat`,
//       // backgroundSize: 'cover',
//       backgroundSize: '100% 140%',
//       alignItems: 'center',
//       color: 'black',

//       height: '150px',
//       textDecoration: 'none',
//       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//       fontSize: '22px',
//     }}>
//       <div style={{ marginLeft: '50px', position: 'absolute', marginTop: '40px' }}>
//         <StyledLink href={activePath.link} isLast >
//           {activePath.label}
//         </StyledLink>
//       </div>
//       <br />
//       <StyledBreadcrumbs separator={<Separator>/</Separator>} >
//         {paths.map((path, index) => (

//           <StyledLink key={index} href={path.link} isLast={index === paths.length - 1}>
//             {path.label}
//           </StyledLink>
//         ))}


//       </StyledBreadcrumbs>
//     </div>
//   );
// };

// export default Breadcrumbs;