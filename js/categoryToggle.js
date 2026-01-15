        function toggleBrowse() {
            const menu = document.getElementById('browseMenu');
            if (window.innerWidth < 1280) {
                menu.classList.toggle('hidden');
            }
        }

        function toggleSub(id) {
            document.getElementById(id).classList.toggle('hidden');
        }