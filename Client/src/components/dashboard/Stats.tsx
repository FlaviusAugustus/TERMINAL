import { useGetProjectAmount } from "@hooks/projects/useGetProjectAmount.ts";
import { useGetProcessAmount } from "@hooks/processes/useProcessAmount.ts";
import { useGetRecipeAmount } from "@hooks/recipes/useGetRecipeAmount.ts";
import { useGetUserAmount } from "@hooks/users/useUserAmount.ts";
import {
  EntityAmountCard,
  EntityAmountCardButton,
} from "@components/dashboard/EntityAmountCard";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const { data: projectAmount } = useGetProjectAmount();
  const { data: sampleAmount } = useGetProcessAmount();
  const { data: recipesAmount } = useGetRecipeAmount();
  const { data: userAmount } = useGetUserAmount();

  const navigate = useNavigate();
  return (
    <>
      <EntityAmountCard
        title="Total projects"
        amount={projectAmount?.data ?? 0}
      >
        <EntityAmountCardButton
          title="Browse All"
          onClick={() => navigate("/projects")}
        />
        <EntityAmountCardButton
          title="Add New"
          onClick={() => navigate("/new-project")}
        />
      </EntityAmountCard>

      <EntityAmountCard title="Total processes" amount={sampleAmount?.data ?? 0}>
        <EntityAmountCardButton
          title="Browse All"
          onClick={() => navigate("/processes")}
        />
        <EntityAmountCardButton
          title="Add New"
          onClick={() => navigate("/new-process")}
        />
      </EntityAmountCard>

      <EntityAmountCard title="Total recipes" amount={recipesAmount?.data ?? 0}>
        <EntityAmountCardButton
          title="Browse All"
          onClick={() => navigate("/recipes")}
        />
        <EntityAmountCardButton
          title="Add New"
          onClick={() => navigate("/new-recipe")}
        />
      </EntityAmountCard>

      <EntityAmountCard title="Total users" amount={userAmount?.data ?? 0}>
        <EntityAmountCardButton title="Browse All" />
        <EntityAmountCardButton title="Invite new" />
      </EntityAmountCard>
    </>
  );
};

export default Stats;
