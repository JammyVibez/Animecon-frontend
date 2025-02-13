import Swal from 'sweetalert2';

const showLevelUpNotification = (newLevel) => {
  Swal.fire({
    title: `Level Up!`,
    text: `Congratulations! You reached Level ${newLevel}!`,
    icon: 'success',
    background: '#f8edeb',
    color: '#1d3557',
    confirmButtonColor: '#f72585'
  });
};
