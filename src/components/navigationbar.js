import { makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
    createStyles({
        navbar: {
            borderRadius: "0px !important",
            color: "#fff"
        },
    })
);

const NavigationBar = () => {
    const styleClasses = useStyles()

    return <nav className={`navbar navbar-default navbar-inverse ${styleClasses.navbar}`}>
        <div className="container-fluid">
            <div className="navbar-header">
                <h3>My Form Builder <small>by @nasiphiVinqishe</small></h3>
            </div>
        </div>
    </nav>

}

export default NavigationBar