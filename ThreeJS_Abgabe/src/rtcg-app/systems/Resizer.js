class Resizer {

    constructor(container, camera, renderer) {

        this.resizeNow(container, camera, renderer);

        window.addEventListener("resize", () => {
            this.resizeNow(container, camera, renderer);

            this.updateRenderSize();
        })
    }
    resizeNow(container, camera, renderer) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);

        renderer.setPixelRatio(window.devicePixelRatio);

    }
    updateRenderSize() { };

}
export { Resizer };