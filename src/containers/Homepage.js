import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { Button, Fab, Grid, makeStyles, Typography, Divider } from '@material-ui/core';
import Footer from '../components/Footer/Footer';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';
import CustomizedTimeline from '../components/TimeLine/TimeLine';
import FAQ from '../components/FAQ/FAQ';
import { logout } from '../redux/actions/account';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 70,
    lineHeight: '80px',
    color: '#37253f',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      lineHeight: '40px',
    },
  },

  subtitle: {
    fontSize: 30,
    // lineHeight: '40px',
    color: '#37253f',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      // marginBottom: theme.spacing(3),
    },
  },

  text: {
    textAlign: 'justify',
    textJustify: 'inter-word',
  },

  divider: {
    boxShadow: '0px 1px 0px 1px #37253F',
    marginTop: '3vh',
    marginBottom: '3vh',
  },

  statImage: {
    background: `url(${process.env.PUBLIC_URL + '/stat.png'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },

  teamWorkImage: {
    background: `url(${process.env.PUBLIC_URL + '/team-work.png'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },

  img: {
    maxWidth: '80%',
    height: 'auto',
  },

  section1: {
    height: '100vh',
    color: 'black',
    padding: theme.spacing(4, 3, 4),
  },

  section1Grid: {
    height: '80vh',
  },

  section2: {
    opacity: '1',
    boxShadow: '3px 3px 3px 3px black',
    color: '#f7f2f6',
    background: '#410066',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  section3: {
    opacity: '1',
    boxShadow: '3px 0px 3px 0px black',
    color: '#f2f2f2',
    background: '#673CC6',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  section4: {
    opacity: '1',
    background: '#7400B8',
    color: '#f2f2f2',
    boxShadow: '3px 0px 3px 0px black',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  section5: {
    opacity: '1',
    background: '#9C89C2',
    // color: '#f2f2f2',
    boxShadow: '3px 0px 3px 0px black',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
}));

function Homepage({ isLoggedIn, logout }) {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();

  return (
    <>
      <Container className={classes.section1}>
        <div id="back-to-top-anchor"></div>
        <div className="landing-background" />

        <Grid container justify="space-between" direction="column">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setAuthDialogOpen(true)}>
                  ورود به رویداد
                </Button>
              </Grid>
              {isLoggedIn && (
                <Grid item>
                  <Button variant="outlined" onClick={() => logout()}>
                    خروج
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" direction="row">
              <Grid item xs={12} sm={6} md={6} />
              <Grid item xs={12} sm={6} md={6}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                  className={classes.section1Grid}
                  spacing={4}>
                  <Grid item>
                    <Typography
                      component="h1"
                      variant="h1"
                      className={classes.title}>
                      A-Lympiad
                    </Typography>
                    <Typography
                      component="h2"
                      variant="h3"
                      className={classes.subtitle}>
                      چهاردهمین دوره مسابقات
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section2} ${classes.centerItems}`}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography component="h2" variant="h2">
              چرا ای‌لیمپیاد؟
            </Typography>
          </Grid>
          <Grid container item direction="row">
            <Grid container item direciton="column" xs={12} sm={6} spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  A-لیمپیاد با هدف افزایش قدرت تفکر، یادگیری تکنیک‌های مدل‌سازی ریاضی، کارگروهی، تمرین نوشتن یافته‌های علمی و جمع‌بندی و ارائه مطالب در هلند و تعدادی دیگر از کشورها برگزار می‌شود.
                  «حل مسئله» و «مدل‌سازی ریاضی» در محتوای درسی بسیاری از کشورها آورده شده است. تمرین این مهارت‌ها معمولا به ندرت انجام می‌شود زیرا کتاب‌هایی با مثال‌های خوب از مسایل مناسب کم‌تر یافت می‌شوند و نیز معلمان برای تدریس این دروس مشکلات زیادی دارند، A-لیمپیاد تلاش می‌کند بستری برای پرورش و ارتقاء این مهارت‌ها ایجاد نماید.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  دانش‌آموزان در این مسابقه برای حل یک مسئله در زندگی واقعی تلاش
                  می‌کنند و در حقیقت مساله به کمک تکنیک‌های مختلف و فرضیات خود
                  دانش‌آموزان حل می‌شود. دانش‌آموزان بایستی صورت دقیق مسئله را
                  تفسیر کنند، استراتژی مناسبی برای حل بیابند، نتایج به دست آورده
                  را تحلیل کنند و نتایج نهایی را ارائه نمایند. نتیجه نهایی این
                  مسابقه گزارشی نوشته شده است که بایستی به روشنی فرضیات،
                  تحلیل‌ها و جمع‌بندی دانش‌آموزان را نشان دهد.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.statImage}></Grid>
          </Grid>
          <Divider variant="middle" className={classes.divider} />
          <Grid container item direction="row">
            <Grid item xs={12} sm={6} className={classes.teamWorkImage}></Grid>
            <Grid container item direciton="column" xs={12} sm={6} spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  این آزمون در بیش از ۹۰ مدرسه در هلند و حدود ۱۷ کشور در دنیا با
                  محوریت موسسه فرودنتال، زیرمجموعه دانشگاه اترخت هلند در حال
                  برگزاری است و در پی پیمان همکاری این موسسه با خانه ریاضیات
                  اصفهان، این آزمون از سال ۱۳۸۶ تا کنون در ایران برگزار می‌گردد.
                  این آزمون ویژگی‌های خاصی دارد:{' '}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>آزمون به صورت گروهی انجام می‌شود.</li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    تیپ سوالات، عموما مسایل واقعی از هر جایی نظیر سازمان‌ها،
                    شرکت‌ها، مراکز پژوهشی و یا مشکلات عمومی یک جامعه است و
                    معمولا این سوال واقعا در جایی مطرح شده است.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    عموما برای ارایه حل برای مساله، یک مدل ریاضی ارائه می‌شود و
                    با یک ایده خاص روی آن بحث می‌شود.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    ایده‌های ارایه شده می‌توانند بسیار متنوع باشند و ممکن است هر
                    کدام مشکلاتی داشته باشند و هیچ‌کدام مساله را ۱۰۰ درصد حل
                    نکنند.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    عموما صورت مساله‌ها طولانی هستند و فرض‌های زیادی دارند و
                    ممکن است یک حل برای یک مساله، از همه فرض‌ها استفاده نکند.
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    حل مساله‌ها نیز کوتاه نیست و عموما بحث‌های تحلیلی نیاز دارد
                    که از این باب، مهارت نوشتن -چه از نظر مهارت چیدمان مطالب و
                    چه از نظر نحوه استدلال- بسیار اهمیت داده می‌شود.{' '}
                  </li>
                </Typography>
                <Typography
                  component="h3"
                  variant="h5"
                  className={classes.text}>
                  <li>
                    بعضی از مسایل صرفا مهارت خواندن موثر فرض‌های مساله و سپس
                    هم‌گردانی، استنتاج و تحلیل آن‌ها و ارایه یک خروجی تحلیل شده
                    را خواسته است.
                  </li>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section3} ${classes.centerItems}`}>
        <Grid container direction="column">
          <Grid item>
            <Typography component="h2" variant="h2">
              فیلم‌هایی که حتما باید ببینید!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomizedTimeline />
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section4} ${classes.centerItems}`}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography component="h2" variant="h2">
              سوالات رایج
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FAQ />
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section5} ${classes.centerItems}`}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography component="h2" variant="h2">
              حامیان
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      {/* <Toolbar id="back-to-top-anchor" /> */}
      <AuthDialog
        open={authDialogOpen}
        handleClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, { logout })(Homepage);
