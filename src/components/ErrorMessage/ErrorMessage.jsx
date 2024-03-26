import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={css.error}>
      Whoops, something went wrong! Please try reloading this page!
    </div>
  );
};

export default ErrorMessage;
