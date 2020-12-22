import Strapi from '../providers/strapi'

const AppDownload = props => {
    const strapi = new Strapi()
    const { app_download_heading, app_download_content, app_download_image, app_download_app_store_image,
        app_download_app_store_url, app_download_play_store_image, app_play_store_url, open_in_new_window } = props.data.app_download

    const onOpenStore = url => {
        const isOpenInNewWindow = open_in_new_window ? '_blank' : '_self'
        window.open(url, `${isOpenInNewWindow}`)
    }

    return (
        <section data-aos="fade-up" className="app-download aos-init">
            <div className="app-bg">
                <div className="container app-download-wrapper">
                    <div className="app-download-wrapper-left">
                        <div className="app-download-content">
                            <div dangerouslySetInnerHTML={{ __html: app_download_heading }}></div>
                            <div dangerouslySetInnerHTML={{ __html: app_download_content }}></div>
                        </div>
                        <div className="download-buttons">
                            <img
                                src={`${strapi.baseUrl}${app_download_play_store_image.url}`}
                                alt={app_download_play_store_image.name}
                                onClick={() => onOpenStore(app_play_store_url)}
                            />
                            <img
                                src={`${strapi.baseUrl}${app_download_app_store_image.url}`}
                                alt={app_download_app_store_image.name}
                                onClick={() => onOpenStore(app_download_app_store_url)}
                            />
                        </div>
                    </div>
                    <div className="app-download-wrapper-right">
                        <img src={`${strapi.baseUrl}${app_download_image.url}`} alt={app_download_image.name} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AppDownload