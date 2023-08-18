document.addEventListener('alpine:init', () => {
  Alpine.data('sweetalert2', () => ({
      fire(message) {
          swal.fire(message)
      },
      sweetalerttitle(){
        Swal.fire({
          title: '<p class="dark:text-white">The Internet?</p>',
          text: 'That thing is still around? question',
          backdrop: `rgba(60,60,60,0.8)`
        })
      },
      sweetalertmodeltitle(){
        Swal.fire({
          icon: 'error',
          title: '<h3 class="dark:text-white">Oops...</h3>',
          text: 'Something went wrong!',
          backdrop: `rgba(60,60,60,0.8)`,
          footer: '<a href="" class="text-primary-500">Why do I have this issue?</a>'
        })
      },
      sweetalertcustomposition(){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          backdrop: `rgba(60,60,60,0.8)`,
          title: '<p class="dark:text-white">Your work has been saved</p>',
          showConfirmButton: false,
          timer: 55000
        })
      },
      sweetalertcustomdialog(){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          backdrop: `rgba(60,60,60,0.8)`,
          confirmButtonText: 'Yes, delete it!',
          confirmButtonColor: "#c03221"
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      },
      sweetalertRestoreAll(){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          backdrop: `rgba(60,60,60,0.8)`,
          confirmButtonText: 'Yes',
          confirmButtonColor: "#c03221"
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Restore!',
              'Your item has been restore.',
              'success'
            )
          }
        })
      },
      sweetalertDelete(){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't to delete this item",
          icon: 'warning',
          showCancelButton: true,
          backdrop: `rgba(60,60,60,0.8)`,
          confirmButtonText: 'Yes,delete it!',
          confirmButtonColor: "#c03221"
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your item has been deleted.',
              'success'
            )
          }
        })
      },
      sweetalertAddCart(){
            Swal.fire(
              'Added!',
              'Your item has been added to the cart.',
              'success'
            )
      },
      sweetalertAddtowishlist(){
        swal.fire(
            'Added!',
            'Your item has been Added to the wishlist.',
            'success'
        )
      },
      sweetalertcustomimage(){
        Swal.fire({
          title: '<p class="dark:text-white">Sweet!</p>',
          text: 'Modal with a custom image.',
          imageUrl: '../../assets/images/pro/plugins/img2.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          backdrop: `rgba(60,60,60,0.8)`
        })
      },
      sweetalertwidthpadding(){
        Swal.fire({
          title: '<p class="dark:text-white">Custom width, padding, background.</p>',
        width: 600,
        padding: '3em',
        background: '#fff url(../../assets/images/pro/plugins/img1.jpeg)',
        backdrop: `rgba(60,60,60,0.8)
              url("../../assets/images/pro/plugins/nyan-cat.gif")
              left top
              no-repeat`
        })
      },
      sweetalertHtmldescription(){
        Swal.fire({
          title: '<strong class="dark:text-white">HTML Example</strong>',
          icon: 'info',
          html:
            'You can use <b>bold text</b>, ' +
            '<a href="//sweetalert2.github.io" class="text-primary-500">links</a> ' +
            'and other HTML tags',
          backdrop: `rgba(60,60,60,0.8)`,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Cancel',
          cancelButtonAriaLabel: 'Thumbs down, cancel!'
        })
      },
      sweetalertdialog(){
        Swal.fire({
          title: '<p class="dark:text-white">Do you want to save the changes?</p>',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
          backdrop: `rgba(60,60,60,0.8)`,
          confirmButtonText: 'Save',
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('<p class="dark:text-white">Saved!</p>', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('<p class="dark:text-white">Changes are not saved</p>', '', 'info')
          }
        })
      },
      sweetalertajaxreq(){
        Swal.fire({
          title: '<p class="dark:text-white">Submit your Github username</p>',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          backdrop: `rgba(60,60,60,0.8)`,
          confirmButtonText: 'Look up',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                return response.json()
              })
              .catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `${result.value.login}'s avatar`,
              imageUrl: result.value.avatar_url,
              backdrop: `rgba(60,60,60,0.8)`
            })
          }
        })
      },
  }))
})
