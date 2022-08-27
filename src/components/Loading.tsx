import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}