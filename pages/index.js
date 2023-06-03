import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";

import { Fa500Px, FaAcquisitionsIncorporated } from "react-icons/fa";
import { GiAlliedStar } from "react-icons/gi";
import firebaseFunctions from "../constants/firebaseFunctions.js";
import { GET_PROJECTS, GET_SKILLS } from "../context/actions.js";
import { useAppContext } from "../context/index.js";
import useFirebase from "../hooks/useFirebase.js";

function DisplayInfoCard({ subtitle, data, icon: Icon, loading }) {
  return (
    <Paper
      sx={{
        p: 5,
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "0.5rem",
        boxShadow:
          "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
      }}
    >
      {loading ? (
        <>
          <Box sx={{ flex: 1, pr: 2 }}>
            <Skeleton variant="text" height={40} width={50} />
            <Skeleton variant="text" />
          </Box>
          <Skeleton variant="rectangular" width={80} height={80} />
        </>
      ) : (
        <>
          <Box>
            <Typography variant="h2" color="grey.800">
              {data}
            </Typography>
            <Typography variant="subtitle1" color="grey.600">
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              color: "primary.main",
            }}
          >
            <Icon size={70} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default function Home() {
  const [{ user, projects, skills }, dispatch] = useAppContext();
  const { fire: fireSkills, loading: skillLoading } = useFirebase({
    firebaseFunc: firebaseFunctions.getDocs,
    onSuccess: (data) => {
      dispatch({
        type: GET_SKILLS,
        payload: data,
      });
    },
    toastError: true,
  });
  const { fire: fireProjects, loading: projectLoading } = useFirebase({
    firebaseFunc: firebaseFunctions.getDocs,
    onSuccess: (data) => {
      dispatch({
        type: GET_PROJECTS,
        payload: data,
      });
    },
    toastError: true,
  });

  useEffect(() => {
    if (user) {
      fireSkills({
        collectionRef: firebaseFunctions.getCollectionRef("skills"),
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log("hello");
      fireProjects({
        collectionRef: firebaseFunctions.getCollectionRef(
          `projects/${user.uid}/project_list/`
        ),
      });
    }
  }, [user]);

  return (
    <>
      <Typography variant="h4" color="grey.800">
        Hi, Welcome back {user?.displayName}
      </Typography>
      <Grid columnSpacing={4} columns={3} container mt={4}>
        <Grid item xs={1}>
          <DisplayInfoCard
            loading={projectLoading}
            subtitle="Total Projects"
            data={projects.length}
            icon={Fa500Px}
          />
        </Grid>
        <Grid item xs={1}>
          <DisplayInfoCard
            loading={skillLoading}
            subtitle="Total Skills"
            data={skills.length}
            icon={FaAcquisitionsIncorporated}
          />
        </Grid>
        <Grid item xs={1}>
          <DisplayInfoCard
            subtitle="Work Experience"
            data={projects.length}
            icon={GiAlliedStar}
          />
        </Grid>
      </Grid>
    </>
  );
}
