        <footer class="main-footer">
            <div class="float-right d-none d-sm-block">
                <b>Version</b> 1.0
            </div>
            <strong>Copyright &copy; <span id="dateCopyRight">2022</span> <a>Transmontes</a>.</strong>
        </footer>
        </div>
        <!-- <script src="./view/assets/bootstrap/js/bootstrap.bundle.min.js"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script>
            // $(".modal-dialog").draggable({
            //     cursor: "move",
            //     handle: ".dragable_touch",
            // })
        </script>
        <script>
            // $.widget.bridge('uibutton', $.ui.button)
            const dateCopy = new Date()
            const formatDateCopy = moment(dateCopy).format('Y')
            $('#dateCopyRight').text(formatDateCopy)
        </script>
        <script src="./view/assets/js/plugins/adminlte/adminlte.min.js"></script>
        <script src="./view/assets/js/plugins/adminlte/dark-mode.js"></script>
        <script src="./view/assets/js/plugins/adminlte/jquery.overlayScrollbars.min.js"></script>
        <!-- <script src="./view/assets/js/plugins/adminlte/IFrame.js"></script> -->
        <script src="./view/assets/js/modulesTM.js"></script>
        </body>

        </html>