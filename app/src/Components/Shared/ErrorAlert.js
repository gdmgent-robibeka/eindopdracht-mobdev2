import Alert from '../Design/Alert';

const ErrorAlert = ({ error }) => {
  if (!error) {
    return null;
  }

  return <Alert color="danger">{error.message || 'Er ging iets fout'}</Alert>;
};

export default ErrorAlert;
