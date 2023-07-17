import { Injectable } from '@angular/core';
import { ParametersGroup } from '../model/parameters-group';
import { Parser, Builder} from 'xml2js';
import * as jsXmlParse from 'json-xml-parse';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private xmlData: string;

  constructor() { 

  this.xmlData = `

  <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet type="text/xsl" href="browser_view.xslt"?>
<?xmlspysps authentic_view.sps?>
<ParametersGroup name="PARADIS_inputs">
	<ParametersGroup name="run_global">
		<ParametersGroup name="display_options">
			<ParametersGroup name="windows_1">
				<Parameter name="box">
					<description>description of the box</description>
					<possible_values>NO; FRAC_2D; FRAC_2D_FLOW; FRAC_3D; FRAC_3D_FLOW; MSFRAC; GRID; POROUS; POROUS_TRACKER</possible_values>
					<type>string</type>
					<value>NO</value>
					<default_value>NO</default_value>
				</Parameter>
				<Parameter name="function">
					<description>with FRAC2D : NETWORK_2D, NETWORK_2D1, NETWORK_2D2 ************************************************************** with FRAC_2D_FLOW : FLOW_2D, FLOW_2D1, FLOW_2D2, HEAD_2D, HEAD_2D1, HEAD_2D2, Ht, Ht_scale, Ht_simple, Ht_double, Tr, Tr_simple, Tr_double           ************************************************************** with FRAC3D : NETWORK_3D, FLOW_3D, MESHING_3D, HEAD_3D, PROJECTION_3D, DISCRETIZATION_3D, HULL_3D, FLOW2D_3D, MESHING2D_3D, PERM_3D **************************************************************** with MSFRAC : MULTI_NETWORK, MULTI_MODIFIED, MULTI_CONNECTED, MULTI_ADDED ************************************************************** with GRID : MAPFRAC_2D, MAPFRACFLOW_2D, FLOWBORDER0, FLOWBORDER1, FLOWBORDER2, MAPALPHA, KPROJ, KPERM, KPERMMEAN, KCLUSTER ************************************************************** with POROUS : POROUS_GRID_K, POROUS_GRID_H, POROUS_GRID_Ht POROUS_GRID_VNORM , POROUS_GRID_VX, POROUS_GRID_VY, POROUS_GRID_VZ, POROUS_GRID_K_PIEZOS ************************************************************** with POROUS_TRACKER : POROUS_GRID_RW, POROUS_GRID_RW_GRID</description>
					<possible_values>NO; NETWORK_2D; NETWORK_2D1; NETWORK_2D2 ; FLOW_2D; FLOW_2D1; FLOW_2D2; HEAD_2D; HEAD_2D1; HEAD_2D2; Ht; Ht_scale; Ht_simple; Ht_double; Tr; Tr_simple; Tr_double; NETWORK_3D; FLOW_3D; MESHING_3D; HEAD_3D; PROJECTION_3D; DISCRETIZATION_3D; HULL_3D; FLOW2D_3D; MESHING2D_3D; PERM_3D; MULTI_NETWORK; MULTI_MODIFIED; MULTI_CONNECTED; MULTI_ADDED; MAPFRAC_2D; MAPFRACFLOW_2D; FLOWBORDER0; FLOWBORDER1; FLOWBORDER2; MAPALPHA; KPROJ; KPERM; KPERMMEAN; KCLUSTER; POROUS_GRID_K; POROUS_GRID_H; POROUS_GRID_Ht; POROUS_GRID_VNORM; POROUS_GRID_VX; POROUS_GRID_VY; POROUS_GRID_VZ; POROUS_GRID_K_PIEZOS; POROUS_GRID_RW; POROUS_GRID_RW_GRID</possible_values>
					<type>string</type>
					<value>NO</value>
					<default_value>NO</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="monte_carlo">
			<Parameter name="continue">
				<description>indicates to continue after already performed simulations, until simulations_number be achieved ; if activated, continue_directory must be indicated</description>
				<possible_values>0: desactivated; 1: activated</possible_values>
				<type>bool</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="continue_directory">
				<description>name of the results directory where to continue</description>
				<possible_values/>
				<type>string</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="parallel_simulations_number">
				<description>if &gt; 1, indicates the number of parallel simulations to realize at the same time</description>
				<possible_values>&gt;=0</possible_values>
				<type>int</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="simulations_number">
				<description>total number of wanted simulations</description>
				<possible_values>&gt;=0</possible_values>
				<type>int</type>
				<value>3</value>
				<default_value>3</default_value>
			</Parameter>
			<Parameter name="visu_test">
				<description>if activated, the visualisation of the last simulation is launched</description>
				<possible_values>0: desactivated; 1: activated</possible_values>
				<type>bool</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<ParametersGroup name="sampling_method">
				<Parameter name="nb_to_skip">
					<description>Number of substreams to skip when random_type=RANDOM_PARTIAL is activated</description>
					<possible_values>&gt;=0</possible_values>
					<type>int</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="random_type">
					<description>Type of method for sampling the stochastic parameter space</description>
					<possible_values>RANDOM_ALL: all seeds are modified for each simulation; RANDOM_PARTIAL: some of the seeds are fixed for all simulations</possible_values>
					<type>string</type>
					<value>RANDOM_ALL</value>
					<default_value>RANDOM_ALL</default_value>
				</Parameter>
				<Parameter name="substreams_variable">
					<description>(,)+(,) List of fixed seeds, only effective it random_type=RANDOM_PARTIAL</description>
					<possible_values/>
					<type>string</type>
					<value>(seeds_transmissivity,LOCAL)+(seeds_transmissivity,GLOBAL)</value>
					<default_value>(seeds_transmissivity,LOCAL)+(seeds_transmissivity,GLOBAL)</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="run_general">
			<ParametersGroup name="display">
				<Parameter name="load_display">
					<description>if opengl_display is activated then load_display specifies if the screen organisation is loaded from parameters or taken by default</description>
					<possible_values>1: activated; 0: desactivated</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="opengl_display">
					<description>activate or desactivate opengl display</description>
					<possible_values>1: activated; 0: desactivated</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="opengl_display_limited_time">
					<description>display for a limited number of seconds</description>
					<possible_values>1: activated; 0: desactivated</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="opengl_in_file">
					<description>if activated, the visualisation is put into a file instead of the screen</description>
					<possible_values>1: activated; 0: desactivated</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="outputs">
				<Parameter name="directory_date">
					<description>activation of date in the root_results_directory</description>
					<possible_values>0: no date in directory name; 1: date in directory name</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="directory_prefix">
					<description>prefix string of the output results directory</description>
					<possible_values/>
					<type>string</type>
					<value>RUN1000</value>
					<default_value>NO_PREFIX</default_value>
				</Parameter>
				<Parameter name="recording_format">
					<description>format of output files recording</description>
					<possible_values>0: ascii; 1: binary; 2: ascii.gz; 3: binary.gz</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="root_results_directory">
					<description>root folder for output files (relative path from HYDROLAB_ROOT, or DEFAULT_SIMPLE_RUN for /runs/prog_name/simple_runs/results)</description>
					<possible_values/>
					<type>string</type>
					<value>/non_regression_tests_results/Automatic/PARADIS/A14_TRANSITION_MATRICE/results</value>
					<default_value>DEFAULT_SIMPLE_RUN</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="rng_parameters">
				<Parameter name="nb_to_skip">
					<description>number of simulations to skip</description>
					<possible_values>&gt;=0</possible_values>
					<type>int</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="s0">
					<description>first element of the seed</description>
					<possible_values>[0;4294967087]</possible_values>
					<type>unsigned long</type>
					<value>327612383</value>
					<default_value>327612383</default_value>
				</Parameter>
				<Parameter name="s1">
					<description>second element of the seed</description>
					<possible_values>[0;4294967087]</possible_values>
					<type>unsigned long</type>
					<value>317095578</value>
					<default_value>317095578</default_value>
				</Parameter>
				<Parameter name="s2">
					<description>third element of the seed</description>
					<possible_values>[0;4294967087]</possible_values>
					<type>unsigned long</type>
					<value>14704821</value>
					<default_value>14704821</default_value>
				</Parameter>
				<Parameter name="s3">
					<description>fourth element of the seed</description>
					<possible_values>[0;4294944443]</possible_values>
					<type>unsigned long</type>
					<value>884064067</value>
					<default_value>884064067</default_value>
				</Parameter>
				<Parameter name="s4">
					<description>fifth element of the seed</description>
					<possible_values>[0;4294944443]</possible_values>
					<type>unsigned long</type>
					<value>1017894425</value>
					<default_value>1017894425</default_value>
				</Parameter>
				<Parameter name="s5">
					<description>sixth element of the seed</description>
					<possible_values>[0;4294944443]</possible_values>
					<type>unsigned long</type>
					<value>16401881</value>
					<default_value>16401881</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="run_type">
				<Parameter name="monte_carlo_study">
					<description>activate or desactivate the statistics study (Monte-Carlo method)</description>
					<possible_values>1: activated; 0: desactivated</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="perform_preprocessing">
					<description>performs preprocessing</description>
					<possible_values>1: yes; 0: no</possible_values>
					<type>bool</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
	</ParametersGroup>
	<ParametersGroup name="simulation">
		<ParametersGroup name="boundary_conditions_domain">
			<ParametersGroup name="borders_description">
				<Parameter name="file_type">
					<description>no_description</description>
					<possible_values/>
					<type>string</type>
					<value>GOCAD</value>
					<default_value>GOCAD</default_value>
				</Parameter>
				<Parameter name="ref_file">
					<description>no_description</description>
					<possible_values/>
					<type>string</type>
					<value>NO_FILE</value>
					<default_value>NO_FILE</default_value>
				</Parameter>
				<ParametersGroup name="x_minus">
					<Parameter name="alpha">
						<description>constant value for alpha value</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="beta">
						<description>constant value for beta value</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="gamma_function">
						<Parameter name="coeff_0">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>10</value>
							<default_value>10</default_value>
						</Parameter>
						<Parameter name="coeff_1">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_2">
							<description> </description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_nb">
							<description>coefficients number used</description>
							<possible_values>&gt;0</possible_values>
							<type>int</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="data_file">
							<description>eventually reads function points in a file (for data function type)</description>
							<possible_values/>
							<type>string</type>
							<value>NO_FILE</value>
							<default_value>NO_FILE</default_value>
						</Parameter>
						<Parameter name="function_type">
							<description>function used to describe boundary conditions around the domain (with curvilienar coordinate) ; valid for a 2D domain</description>
							<possible_values>0: POLYNOME_COEFF; 1: POLYNOME_INTERPOLATION; 2: MULT_LINEAR; 3: COS; 4: SIN; 5: DATA; 6: STEP</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="x_plus">
					<Parameter name="alpha">
						<description>constant value for alpha value</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="beta">
						<description>constant value for beta value</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="gamma_function">
						<Parameter name="coeff_0">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_1">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_2">
							<description> </description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_nb">
							<description>coefficients number used</description>
							<possible_values>&gt;0</possible_values>
							<type>int</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="data_file">
							<description>eventually reads function points in a file (for data function type)</description>
							<possible_values/>
							<type>string</type>
							<value>NO_FILE</value>
							<default_value>NO_FILE</default_value>
						</Parameter>
						<Parameter name="function_type">
							<description>function used to describe boundary conditions around the domain (with curvilienar coordinate) ; valid for a 2D domain</description>
							<possible_values>0: POLYNOME_COEFF; 1: POLYNOME_INTERPOLATION; 2: MULT_LINEAR; 3: COS; 4: SIN; 5: DATA; 6: STEP</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="y_minus">
					<Parameter name="alpha">
						<description>constant value for alpha value</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="beta">
						<description>constant value for beta value</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<ParametersGroup name="gamma_function">
						<Parameter name="coeff_0">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_1">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_2">
							<description> </description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_nb">
							<description>coefficients number used</description>
							<possible_values>&gt;0</possible_values>
							<type>int</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="data_file">
							<description>eventually reads function points in a file (for data function type)</description>
							<possible_values/>
							<type>string</type>
							<value>NO_FILE</value>
							<default_value>NO_FILE</default_value>
						</Parameter>
						<Parameter name="function_type">
							<description>function used to describe boundary conditions around the domain (with curvilienar coordinate) ; valid for a 2D domain</description>
							<possible_values>0: POLYNOME_COEFF; 1: POLYNOME_INTERPOLATION; 2: MULT_LINEAR; 3: COS; 4: SIN; 5: DATA; 6: STEP</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="y_plus">
					<Parameter name="alpha">
						<description>constant value for alpha value</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="beta">
						<description>constant value for beta value</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<ParametersGroup name="gamma_function">
						<Parameter name="coeff_0">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_1">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_2">
							<description> </description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_nb">
							<description>coefficients number used</description>
							<possible_values>&gt;0</possible_values>
							<type>int</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="data_file">
							<description>eventually reads function points in a file (for data function type)</description>
							<possible_values/>
							<type>string</type>
							<value>NO_FILE</value>
							<default_value>NO_FILE</default_value>
						</Parameter>
						<Parameter name="function_type">
							<description>function used to describe boundary conditions around the domain (with curvilienar coordinate) ; valid for a 2D domain</description>
							<possible_values>0: POLYNOME_COEFF; 1: POLYNOME_INTERPOLATION; 2: MULT_LINEAR; 3: COS; 4: SIN; 5: DATA; 6: STEP</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="z_minus">
					<Parameter name="alpha">
						<description>constant value for alpha value</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="beta">
						<description>constant value for beta value</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<ParametersGroup name="gamma_function">
						<Parameter name="coeff_0">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_1">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_2">
							<description> </description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_nb">
							<description>coefficients number used</description>
							<possible_values>&gt;0</possible_values>
							<type>int</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="data_file">
							<description>eventually reads function points in a file (for data function type)</description>
							<possible_values/>
							<type>string</type>
							<value>NO_FILE</value>
							<default_value>NO_FILE</default_value>
						</Parameter>
						<Parameter name="function_type">
							<description>function used to describe boundary conditions around the domain (with curvilienar coordinate) ; valid for a 2D domain</description>
							<possible_values>0: POLYNOME_COEFF; 1: POLYNOME_INTERPOLATION; 2: MULT_LINEAR; 3: COS; 4: SIN; 5: DATA; 6: STEP</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="z_plus">
					<Parameter name="alpha">
						<description>constant value for alpha value</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="beta">
						<description>constant value for beta value</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<ParametersGroup name="gamma_function">
						<Parameter name="coeff_0">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_1">
							<description>no_description</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_2">
							<description> </description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="coeff_nb">
							<description>coefficients number used</description>
							<possible_values>&gt;0</possible_values>
							<type>int</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="data_file">
							<description>eventually reads function points in a file (for data function type)</description>
							<possible_values/>
							<type>string</type>
							<value>NO_FILE</value>
							<default_value>NO_FILE</default_value>
						</Parameter>
						<Parameter name="function_type">
							<description>function used to describe boundary conditions around the domain (with curvilienar coordinate) ; valid for a 2D domain</description>
							<possible_values>0: POLYNOME_COEFF; 1: POLYNOME_INTERPOLATION; 2: MULT_LINEAR; 3: COS; 4: SIN; 5: DATA; 6: STEP</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
			</ParametersGroup>
			<ParametersGroup name="boundary_condition_description">
				<Parameter name="boundary_condition_description">
					<description>parameter group used to describe boundary conditions</description>
					<possible_values>0: simple_description; 1: borders_description</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="boundary_condition_position">
					<description>head boundary conditions will be applied at the node or at the border of the border meshes</description>
					<possible_values>0: HEAD_AT_NODE; 1: HEAD_AT_BORDER</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="dhdn_or_velocity_imposed">
					<description>if dh/dn imposed, equation is alpha*h + beta*dh/dn = gamma ; if velocity imposed equation is alpha*h + beta*K*dh/dn = gamma</description>
					<possible_values>0: dh/dn imposed; 1: velocity imposed</possible_values>
					<type>short</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="perturbation">
					<description>add noise to boundary conditions</description>
					<possible_values>0: inactive; 1: random</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="perturbation_amplitude">
					<description>amplitude of the noise</description>
					<possible_values>0: no amplitude; 1: maximal amplitude</possible_values>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="rotation">
					<description>apply a rotation to the given boundary conditions?</description>
					<possible_values>0: inactive; 1:active</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="rotation_angle">
					<description>rotation angle</description>
					<possible_values>[0;360[</possible_values>
					<type>double</type>
					<value>45</value>
					<default_value>45</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="head_imposed_location">
				<Parameter name="manual_flow">
					<description>Values for imposed flow (values separated by # or VOID)</description>
					<possible_values/>
					<type>string</type>
					<value>VOID</value>
					<default_value>VOID</default_value>
				</Parameter>
				<Parameter name="manual_flow_length">
					<description>Lengths of the flow wells (values separated by # or VOID ; put 0 for a well in only 1 cell)</description>
					<possible_values/>
					<type>string</type>
					<value>VOID</value>
					<default_value>VOID</default_value>
				</Parameter>
				<Parameter name="manual_flow_top_location">
					<description>Coordinates locations of wells at imposed flow ([x,y,z] separated by # or VOID)</description>
					<possible_values/>
					<type>string</type>
					<value>VOID</value>
					<default_value>VOID</default_value>
				</Parameter>
				<Parameter name="manual_head">
					<description>Values for imposed head (values separated by # or VOID)</description>
					<possible_values/>
					<type>string</type>
					<value>VOID</value>
					<default_value>VOID</default_value>
				</Parameter>
				<Parameter name="manual_head_length">
					<description>Lengths of the head wells (values separated by # or VOID ; put 0 for a well in only 1 cell)</description>
					<possible_values/>
					<type>string</type>
					<value>VOID</value>
					<default_value>VOID</default_value>
				</Parameter>
				<Parameter name="manual_head_top_location">
					<description>Coordinates locations of wells at imposed head ([x,y,z] separated by # or VOID)</description>
					<possible_values/>
					<type>string</type>
					<value>VOID</value>
					<default_value>VOID</default_value>
				</Parameter>
				<Parameter name="manual_history">
					<description>History of source and sink flows ([,,] separated by # or VOID)</description>
					<possible_values/>
					<type>string</type>
					<value>VOID</value>
					<default_value>VOID</default_value>
				</Parameter>
				<Parameter name="source_file_path">
					<description>If !NO_FILE, reads the file containing wells information : positions (x, y, z) then type (flow or head) and then the value of the well </description>
					<possible_values/>
					<type>string</type>
					<value>NO_FILE</value>
					<default_value>NO_FILE</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="simple_description">
				<Parameter name="alpha1">
					<description>no_description</description>
					<possible_values/>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="alpha2">
					<description>no_description</description>
					<possible_values/>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="beta1">
					<description>no_description</description>
					<possible_values/>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="beta2">
					<description>no_description</description>
					<possible_values/>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="boundary_conditions_type">
					<description>boundary type: (0) fixed head (h_max and h_min) on the borders perpendicular to flow_direction and flow=0 on the other borders, (1) alpha1*h+beta1(*K)*dh/dn=gamma1 and alpha2*h+beta2(*K)*dh/dn=gamma2 on the borders perpendicular to flow_direction and flow=0 on the other borders, (2) fixed head (h_max and h_min) on the borders perpendicular to flow_direction and fixed head which evolves lineraly on the other borders, (3) fixed head (h_max) on all the borders, (4) aquifer type boundary conditions with flow_imposed on borders X- and Y-,  gradient from h_max to h_min on borders X+ and Y+</description>
					<possible_values>0: permeameter_classic; 1: permeameter_robin; 2: gradient; 3: well; 4: aquifer_bc; 5: permeameter with boundary conditions periodic in the other directions; 6: head boundary conditions imposed inside the domain</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="flow_direction">
					<description>flow direction</description>
					<possible_values>0: DIR_I; 1: DIR_J; 2: DIR_K</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="flow_imposed">
					<description>value for dh/dn or velocity imposed</description>
					<possible_values/>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="gamma1">
					<description>no_description</description>
					<possible_values/>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="gamma2">
					<description>no_description</description>
					<possible_values/>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="h_max">
					<description>maximum head value, generally computed inside the code</description>
					<possible_values/>
					<type>double</type>
					<value>32</value>
					<default_value>10</default_value>
				</Parameter>
				<Parameter name="h_min">
					<description>minimum head value</description>
					<possible_values/>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="source_terms">
				<Parameter name="type_location">
					<description>type of locations of sink and source terms (VOID if not any)</description>
					<possible_values>VOID; CENTER; DIPOLE; TRIPOLE; QUADRUPOLE; MANUAL</possible_values>
					<type>string</type>
					<value>VOID</value>
					<default_value>VOID</default_value>
				</Parameter>
				<ParametersGroup name="manual_location">
					<Parameter name="manual_flow">
						<description>Values for imposed flow (values separated by # or VOID)</description>
						<possible_values/>
						<type>string</type>
						<value>VOID</value>
						<default_value>VOID</default_value>
					</Parameter>
					<Parameter name="manual_flow_length">
						<description>Lengths of the flow wells (values separated by # or VOID ; put 0 for a well in only 1 cell)</description>
						<possible_values/>
						<type>string</type>
						<value>VOID</value>
						<default_value>VOID</default_value>
					</Parameter>
					<Parameter name="manual_flow_top_location">
						<description>Coordinates locations of wells at imposed flow ([x,y,z] separated by # or VOID)</description>
						<possible_values/>
						<type>string</type>
						<value>VOID</value>
						<default_value>VOID</default_value>
					</Parameter>
					<Parameter name="manual_head">
						<description>Values for imposed head (values separated by # or VOID)</description>
						<possible_values/>
						<type>string</type>
						<value>VOID</value>
						<default_value>VOID</default_value>
					</Parameter>
					<Parameter name="manual_head_length">
						<description>Lengths of the head wells (values separated by # or VOID ; put 0 for a well in only 1 cell)</description>
						<possible_values/>
						<type>string</type>
						<value>VOID</value>
						<default_value>VOID</default_value>
					</Parameter>
					<Parameter name="manual_head_top_location">
						<description>Coordinates locations of wells at imposed head ([x,y,z] separated by # or VOID)</description>
						<possible_values/>
						<type>string</type>
						<value>VOID</value>
						<default_value>VOID</default_value>
					</Parameter>
					<Parameter name="manual_history">
						<description>History of source and sink flows ([,,] separated by # or VOID)</description>
						<possible_values/>
						<type>string</type>
						<value>VOID</value>
						<default_value>VOID</default_value>
					</Parameter>
					<Parameter name="source_file_path">
						<description>If !NO_FILE, reads the file containing wells information : positions (x, y, z) then type (flow or head) and then the value of the well </description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="npole">
					<Parameter name="npole_scale_absolute">
						<description>characteristic scale between poles in absolute terms</description>
						<possible_values/>
						<type>double</type>
						<value>5</value>
						<default_value>5</default_value>
					</Parameter>
					<Parameter name="npole_scale_flows">
						<description>list of flows on npoles</description>
						<possible_values/>
						<type>string</type>
						<value>TOP=1#LEFT=-0.5#RIGHT=-0.5</value>
						<default_value>TOP=1#LEFT=-0.5#RIGHT=-0.5</default_value>
					</Parameter>
					<Parameter name="npole_scale_relative">
						<description>characteristic scale between poles in relative terms (in percent)</description>
						<possible_values/>
						<type>double</type>
						<value>30</value>
						<default_value>30</default_value>
					</Parameter>
					<Parameter name="npole_scale_type">
						<description>type of computation of the characteristic scale</description>
						<possible_values>RELATIVE; ABSOLUTE</possible_values>
						<type>string</type>
						<value>RELATIVE</value>
						<default_value>RELATIVE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="time_dependence">
					<Parameter name="n_time_skip">
						<description>Number of skipped step between the pulse and the first recorded step</description>
						<possible_values>&gt;=0</possible_values>
						<type>int</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="pulse_duration">
						<description>Pulse duration. If pulse duration &gt; Initial time, reduction of pulse duration such that it is 1/pulse_duration times smaller</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0.1</value>
						<default_value>0.1</default_value>
					</Parameter>
					<Parameter name="type_history">
						<description>type of time signature of sink and source terms</description>
						<possible_values>VOID; CONTINUOUS; PULSE; MANUAL</possible_values>
						<type>string</type>
						<value>PULSE</value>
						<default_value>PULSE</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="flow">
			<Parameter name="flow_line_width">
				<description>percentage of flow to discriminate flow lines</description>
				<possible_values>[0;1]</possible_values>
				<type>double</type>
				<value>0.1</value>
				<default_value>0.1</default_value>
			</Parameter>
			<ParametersGroup name="flow_visualisation">
				<Parameter name="color">
					<description>activation or not of the color to draw fractures</description>
					<possible_values>0: desactivated; 1: activated</possible_values>
					<type>int</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="color_exp">
					<description>exponent of the power law giving the channel grey intensity from the flow value</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="color_min">
					<description>minimum grey intensity for channel flow visualisation</description>
					<possible_values>0: white; 1: black</possible_values>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="lin_log">
					<description>type of color scale </description>
					<possible_values>0: linear scale; 1: log scale</possible_values>
					<type>int</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="width_exp">
					<description>exponent of the power law giving the channel thickness from the aperture value</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="width_max">
					<description>maximum width for channel flow visualisation</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>5</value>
					<default_value>5</default_value>
				</Parameter>
				<Parameter name="width_min">
					<description>minimum width for channel flow visualisation</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="steady_system_solver">
				<Parameter name="closure_global">
					<description>Relative error on sum of fluxes on the domain boundaries</description>
					<possible_values/>
					<type>double</type>
					<value>0.0001</value>
					<default_value>0.0001</default_value>
				</Parameter>
				<Parameter name="computation_method">
					<description>method used to compute the flow</description>
					<possible_values>0: classic; 1: robin; 2: DDM</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="identity_extraction">
					<description>option available only in sequential: if an identity matrix is present within the linear system matrix, extract it before solving and keep the associated Dirichlet BC</description>
					<possible_values>0: no extraction; 1: extract the identity matrix before solving</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="iter_max">
					<description>maximum number of iterations (for iterative solver only)</description>
					<possible_values>&gt; 0</possible_values>
					<type>int</type>
					<value>500</value>
					<default_value>500</default_value>
				</Parameter>
				<Parameter name="linear_solver">
					<description>linear solver to use</description>
					<possible_values>0:PETSC; 1:UMFPACK; 2:PSPASES; 3:HypreBoomerAMG; 4:HypreSMG; 5:HyprePCG precond by BOOMERAMG; 6:MUMPS; 7:HypreGMRES precond by Euclid; 8:HypreBiCGSTAB precond by Euclid</possible_values>
					<type>short</type>
					<value>3</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="save_K">
					<description>Whether to save the permeability or not</description>
					<possible_values/>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="save_matrix">
					<description>Whether to save the system or not</description>
					<possible_values>0: Do not save the system's matrix; 1: Save the system's matrix</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="save_p">
					<description>Whether to save the mean head or not</description>
					<possible_values/>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="scaling">
					<description>say if scaling of the linear system is active or not</description>
					<possible_values>0:scaling on; 1:scaling off</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="screen">
					<description>no_description</description>
					<possible_values>&gt;0</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="solver_precision">
					<description>precision parameters for the solver, if relevant.</description>
					<possible_values/>
					<type>double</type>
					<value>1e-12</value>
					<default_value>1e-12</default_value>
				</Parameter>
				<Parameter name="sparse_nummering">
					<description>sparse nummering of the system for lacunary structures</description>
					<possible_values>0: no sparse nummering</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="update_precision">
					<description>option available only if identity_extraction is not active: if an identity matrix is present within the linear system matrix, rescale solver_precision according to the norms of Dirichlet BC vs the remaining terms in the second member</description>
					<possible_values>0: update_precision on; 1:update_precision off</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="flow_semi_transient">
			<Parameter name="nb_steady_states">
				<description>Number of steady states</description>
				<possible_values>&gt;0</possible_values>
				<type>short</type>
				<value>2</value>
				<default_value>2</default_value>
			</Parameter>
			<Parameter name="parameters_affectation">
				<description>Affect parameters and value to each state S1=P1/V1*Pi/Vj*Pn/Vn#S2=...</description>
				<possible_values/>
				<type>string</type>
				<value>S1=P1/V1#S2=P1/V1</value>
				<default_value>S1=P1/V1#S2=P1/V1</default_value>
			</Parameter>
			<Parameter name="parameters_list">
				<description>List of parameters to modify for all steady states P1="parameter name"#P2 = "parameter name 2"</description>
				<possible_values/>
				<type>string</type>
				<value>P1=manual_flow</value>
				<default_value>P1=manual_flow</default_value>
			</Parameter>
			<Parameter name="time_limits_list">
				<description>List of periods of steady states T1 ="period 1"#T2="period 2"</description>
				<possible_values/>
				<type>string</type>
				<value>T1=20</value>
				<default_value>T1=20</default_value>
			</Parameter>
			<Parameter name="values_list">
				<description>List of parameters value for all steady states V1="parameter value"#V2 = "parameter name 2"</description>
				<possible_values/>
				<type>string</type>
				<value>V1=1</value>
				<default_value>V1=1</default_value>
			</Parameter>
		</ParametersGroup>
		<ParametersGroup name="fractal">
			<Parameter name="K_fixed_at_center">
				<description>Is the value at the center fixed?</description>
				<possible_values>0;1</possible_values>
				<type>bool</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="Nech">
				<description>COMPUTED INSIDE: TO CHECK</description>
				<possible_values>&gt;=0</possible_values>
				<type>int</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="file_Pi">
				<description>Ouput File for Pi</description>
				<possible_values/>
				<type>string</type>
				<value>Fractals_Pi_out.txt</value>
				<default_value>Fractals_Pi_out.txt</default_value>
			</Parameter>
			<Parameter name="fractal_type">
				<description>Fractal or multifractal type</description>
				<possible_values>NO_FRACTAL;SIERPINSKI_MULTIFRACTAL;SIERPINSKI_FRACTAL_MULTIFRACTAL SIERPINSKI_LATTICE;SIERPINSKI_LATTICE_MULTIFRACAL</possible_values>
				<type>string</type>
				<value>NO_FRACTAL</value>
				<default_value>NO_FRACTAL</default_value>
			</Parameter>
			<Parameter name="kmin">
				<description>Minimal bottom permeability</description>
				<possible_values>&gt;0</possible_values>
				<type>double</type>
				<value>1e-10</value>
				<default_value>1e-10</default_value>
			</Parameter>
			<Parameter name="lattice_level">
				<description>level of division to generate a sierpinski lattice medium</description>
				<possible_values>&gt;0</possible_values>
				<type>int</type>
				<value>1</value>
				<default_value>1</default_value>
			</Parameter>
			<Parameter name="n_break">
				<description>Number of fundamental pattern division [2,4]</description>
				<possible_values>2;3;4</possible_values>
				<type>int</type>
				<value>2</value>
				<default_value>2</default_value>
			</Parameter>
			<Parameter name="on_permutation">
				<description>Permutation in pattern reproduction</description>
				<possible_values>0;1</possible_values>
				<type>int</type>
				<value>1</value>
				<default_value>1</default_value>
			</Parameter>
			<Parameter name="screen">
				<description>Screen printing</description>
				<possible_values/>
				<type>int</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<ParametersGroup name="centre">
				<Parameter name="fixed_order">
					<description>Is the order at the centre fixed?</description>
					<possible_values>0;1</possible_values>
					<type>int</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="k">
					<description>Value of K at the center</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>0.1</value>
					<default_value>0.1</default_value>
				</Parameter>
				<Parameter name="k_prec">
					<description>Precision of the centre value (in log scale)</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>0.1</value>
					<default_value>0.1</default_value>
				</Parameter>
				<Parameter name="order">
					<description>Order of the centre in a Sierpinski Lattice structure (order 1 corresponds to largest line)</description>
					<possible_values>&gt;=1</possible_values>
					<type>int</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="fractal">
				<Parameter name="nb">
					<description>Number of full meshes if D0&lt;2, [n_break,n_break^2]</description>
					<possible_values/>
					<type>int</type>
					<value>3</value>
					<default_value>3</default_value>
				</Parameter>
				<Parameter name="on">
					<description>Is Fractal lacunar D0&lt;2?</description>
					<possible_values>0;1</possible_values>
					<type>int</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="lattice">
				<Parameter name="p">
					<description>Sierpinski Occupation Probability</description>
					<possible_values>]0;1]</possible_values>
					<type>double</type>
					<value>0.9</value>
					<default_value>0.9</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="multifractal">
				<Parameter name="dc">
					<description>Correlation Dimension Dc between d-1 and d</description>
					<possible_values/>
					<type>double</type>
					<value>1.7</value>
					<default_value>1.7</default_value>
				</Parameter>
				<Parameter name="on_Pi">
					<description>Generation from fixed Pi's</description>
					<possible_values>0;1</possible_values>
					<type>int</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="seeds_fractals">
				<Parameter name="CENTER_VALUE">
					<description>no_description</description>
					<possible_values>0</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="CORRELATION_DIMENSION">
					<description>no_description</description>
					<possible_values>0</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="PATTERN_PI">
					<description>no_description</description>
					<possible_values>0</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="PERMUTATIONS">
					<description>no_description</description>
					<possible_values>0</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="POINT_DRAWING">
					<description>no_description</description>
					<possible_values>0</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="SIERPINSKI">
					<description>no_description</description>
					<possible_values>0</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="grid">
			<Parameter name="border_node_position">
				<description>position of the node in the border meshes (in all other meshes the node is always at the center)</description>
				<possible_values>0: CENTER_MESH; 1: BORDER_MESH</possible_values>
				<type>short</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="grid_definition">
				<description>type of grid construction (FROM_FILE and MULTIPARTS not implemented)</description>
				<possible_values>REGULAR; FROM_FILE; BIPARTS; MULTIPARTS</possible_values>
				<type>string</type>
				<value>REGULAR</value>
				<default_value>REGULAR</default_value>
			</Parameter>
			<ParametersGroup name="biparts">
				<ParametersGroup name="DIR_X">
					<Parameter name="D1">
						<description>step in part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="D2">
						<description>step in part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="F1">
						<description>increment factor for step in part 1 (if L1 is imposed, F1 may be adapted to match L1 exactly)</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="F2">
						<description>increment factor for step in part 2 (if L2 is imposed, F2 may be adapted to match L2 exactly)</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1.5</value>
						<default_value>1.5</default_value>
					</Parameter>
					<Parameter name="L1">
						<description>length of part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="L2">
						<description>length of part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="N1">
						<description>number of meshes in part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>int</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="N2">
						<description>number of meshes in part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>int</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part1_definition">
						<description>type of construction in part 1; REGULAR_: constant step; GEOMETRIC_: step starts from D1 and is incremented by a constant multiplication factor F1 (when L1 is imposed, F1 is computed to match L1)</description>
						<possible_values>0: REGULAR_N1_D1; 1: REGULAR_N1_L1; 2: REGULAR_D1_L1; 3: GEOMETRIC_D1_N1_F1; 4: GEOMETRIC_D1_N1_L1; 5: GEOMETRIC_D1_F1_L1</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part2_definition">
						<description>type of construction in part 2; REGULAR_: constant step; GEOMETRIC_: step starts from step in part 1 and is incremented by a constant multiplication factor F2 (when L2 is imposed, F2 is computed to match L2)</description>
						<possible_values>0: REGULAR_N2_D2; 1: REGULAR_N2_L2; 2: REGULAR_D2_L2; 3: GEOMETRIC_N2_F2; 4: GEOMETRIC_N2_L2; 5: GEOMETRIC_F2_L2</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part2_down">
						<description>if activated, construction of lines of part2 goes down starting from the first line of part1</description>
						<possible_values>0: inactivated; 1: activated</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="reverse">
						<description>if activated, construction of lines is done from high to low coordinates</description>
						<possible_values>0: inactivated; 1: activated</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="DIR_Y">
					<Parameter name="D1">
						<description>step in part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="D2">
						<description>step in part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="F1">
						<description>increment factor for step in part 1 (if L1 is imposed, F1 may be adapted to match L1 exactly)</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="F2">
						<description>increment factor for step in part 2 (if L2 is imposed, F2 may be adapted to match L2 exactly)</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1.5</value>
						<default_value>1.5</default_value>
					</Parameter>
					<Parameter name="L1">
						<description>length of part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="L2">
						<description>length of part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="N1">
						<description>number of meshes in part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>int</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="N2">
						<description>number of meshes in part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>int</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part1_definition">
						<description>type of construction in part 1; REGULAR_: constant step; GEOMETRIC_: step starts from D1 and is incremented by a constant multiplication factor F1 (when L1 is imposed, F1 is computed to match L1)</description>
						<possible_values>0: REGULAR_N1_D1; 1: REGULAR_N1_L1; 2: REGULAR_D1_L1; 3: GEOMETRIC_D1_N1_F1; 4: GEOMETRIC_D1_N1_L1; 5: GEOMETRIC_D1_F1_L1</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part2_definition">
						<description>type of construction in part 2; REGULAR_: constant step; GEOMETRIC_: step starts from step in part 1 and is incremented by a constant multiplication factor F2 (when L2 is imposed, F2 is computed to match L2)</description>
						<possible_values>0: REGULAR_N2_D2; 1: REGULAR_N2_L2; 2: REGULAR_D2_L2; 3: GEOMETRIC_N2_F2; 4: GEOMETRIC_N2_L2; 5: GEOMETRIC_F2_L2</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part2_down">
						<description>if activated, construction of lines of part2 goes down starting from the first line of part1</description>
						<possible_values>0: inactivated; 1: activated</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="reverse">
						<description>if activated, construction of lines is done from high to low coordinates</description>
						<possible_values>0: inactivated; 1: activated</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="DIR_Z">
					<Parameter name="D1">
						<description>step in part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="D2">
						<description>step in part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="F1">
						<description>increment factor for step in part 1 (if L1 is imposed, F1 may be adapted to match L1 exactly)</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="F2">
						<description>increment factor for step in part 2 (if L2 is imposed, F2 may be adapted to match L2 exactly)</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1.5</value>
						<default_value>1.5</default_value>
					</Parameter>
					<Parameter name="L1">
						<description>length of part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="L2">
						<description>length of part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="N1">
						<description>number of meshes in part 1</description>
						<possible_values>&gt;=0</possible_values>
						<type>int</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="N2">
						<description>number of meshes in part 2</description>
						<possible_values>&gt;=0</possible_values>
						<type>int</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part1_definition">
						<description>type of construction in part 1; REGULAR_: constant step; GEOMETRIC_: step starts from D1 and is incremented by a constant multiplication factor F1 (when L1 is imposed, F1 is computed to match L1)</description>
						<possible_values>0: REGULAR_N1_D1; 1: REGULAR_N1_L1; 2: REGULAR_D1_L1; 3: GEOMETRIC_D1_N1_F1; 4: GEOMETRIC_D1_N1_L1; 5: GEOMETRIC_D1_F1_L1</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part2_definition">
						<description>type of construction in part 2; REGULAR_: constant step; GEOMETRIC_: step starts from step in part 1 and is incremented by a constant multiplication factor F2 (when L2 is imposed, F2 is computed to match L2)</description>
						<possible_values>0: REGULAR_N2_D2; 1: REGULAR_N2_L2; 2: REGULAR_D2_L2; 3: GEOMETRIC_N2_F2; 4: GEOMETRIC_N2_L2; 5: GEOMETRIC_F2_L2</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="part2_down">
						<description>if activated, construction of lines of part2 goes down starting from the first line of part1</description>
						<possible_values>0: inactivated; 1: activated</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="reverse">
						<description>if activated, construction of lines is done from high to low coordinates</description>
						<possible_values>0: inactivated; 1: activated</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
			<ParametersGroup name="from_file"/>
			<ParametersGroup name="multiparts"/>
			<ParametersGroup name="output">
				<Parameter name="lines_position">
					<description>no_description</description>
					<possible_values>0: not saved; 1: saved</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="nodes_position">
					<description>no_description</description>
					<possible_values>0: not saved; 1: saved</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="parallel_repartition">
				<Parameter name="communication_type">
					<description>communication type between processors</description>
					<possible_values>0:CASCADE; 1:PAIRWISE</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="cutting_type">
					<description>cutting type for the parallel array</description>
					<possible_values>0:CUTTING_HORI; 1:CUTTING_VERT; 2:CUTTING_BLOC</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="x_macro_number">
					<description>number of macro domains in x direction, note : total number of domains (macro+sub) must be equal to the number of MPI processes launched</description>
					<possible_values>&gt;0</possible_values>
					<type>int</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="x_sub_number">
					<description>number of sub domains in x direction, note total number of domains (macro+sub) must be equal to the number of MPI processes launched</description>
					<possible_values>&gt;0</possible_values>
					<type>int</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="y_macro_number">
					<description>number of macro domains in y direction, note : total number of domains (macro+sub) must be equal to the number of MPI processes launched</description>
					<possible_values>&gt;0</possible_values>
					<type>int</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="y_sub_number">
					<description>number of sub domains in y direction; note : total number of domains (macro+sub) must be equal to the number of MPI processes launched</description>
					<possible_values>&gt;0</possible_values>
					<type>int</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="z_macro_number">
					<description>number of macro domains in z direction, note : total number of domains (macro+sub) must be equal to the number of MPI processes launched</description>
					<possible_values>&gt;0</possible_values>
					<type>int</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="z_sub_number">
					<description>number of sub domains in z direction; note : total number of domains (macro+sub) must be equal to the number of MPI processes launched</description>
					<possible_values>&gt;0</possible_values>
					<type>int</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="regular">
				<Parameter name="Dx">
					<description>grid step in x direction (if Lx is imposed,  Dx may be adapted to match Lx exactly)</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="Dy">
					<description>grid step in y direction (if Ly is imposed,  Dy may be adapted to match Ly exactly)</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="Dz">
					<description>grid step in z direction (if Lz is imposed,  Dz may be adapted to match Lz exactly)</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="Lx">
					<description>length of the domain in x direction</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="Ly">
					<description>length of the domain in y direction</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="Lz">
					<description>length of the domain in z direction</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="Nx">
					<description>number of meshes in direction x</description>
					<possible_values>&gt;=0</possible_values>
					<type>int</type>
					<value>32</value>
					<default_value>32</default_value>
				</Parameter>
				<Parameter name="Ny">
					<description>number of meshes in direction y</description>
					<possible_values>&gt;=0</possible_values>
					<type>int</type>
					<value>32</value>
					<default_value>32</default_value>
				</Parameter>
				<Parameter name="Nz">
					<description>number of meshes in direction z</description>
					<possible_values>&gt;=0</possible_values>
					<type>int</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="border_mesh_half">
					<description>if activated, the borders meshes are cut half</description>
					<possible_values>0: inactivated; 1: activated</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="size_definition">
					<description>indicates which parameters to take to define the grid</description>
					<possible_values>0: Nx, Ny, Nz, Dx, Dy, Dz; 1: Nx, Ny, Nz, Lx, Ly, Lz; 2: Dx, Dy, Dz, Lx, Ly, Lz</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="no_statistics"/>
		<ParametersGroup name="permeability">
			<ParametersGroup name="grid_property">
				<Parameter name="add_fracture">
					<description>activate or deactivate the addition of fracture over the field already generated (fracture is defined in fracture group)</description>
					<possible_values>0: no fracture added; 1: fracture added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="add_lense">
					<description>activate or deactivate the addition of lense over the field already generated (lense is defined in lense groups)</description>
					<possible_values>0: no lense added; 1: lenses added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="field_type">
					<description>Type of field in terms of structure. ParametersGroup distribution is required for the three first options. </description>
					<possible_values>NO_CORRELATION:random non correlated field; CORRELATION:MultiGaussian correlated field; STRATIFICATION:Stratified field; STRUCTURE:Block structured field; FRACTAL:fractal and multifractal correlations; FILE:enter field from a file; INCLUSIONS:inclusions in an homogeneous field</possible_values>
					<type>string</type>
					<value>CORRELATION</value>
					<default_value>NO_CORRELATION</default_value>
				</Parameter>
				<Parameter name="large_generation">
					<description>generates the permeability field in a 10 times larger grid to avoid border effects</description>
					<possible_values>0: classical generation; 1: enlarging the generation</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<ParametersGroup name="correlation">
					<Parameter name="correlation_type">
						<description>type of correlation function</description>
						<possible_values>GAUSSIAN; EXPONENTIAL; POWER</possible_values>
						<type>string</type>
						<value>EXPONENTIAL</value>
						<default_value>GAUSSIAN</default_value>
					</Parameter>
					<Parameter name="generation_type">
						<description>REAL_SPACE: generates the correlation function, discretizes it and fourier transfrom it, FOURIER_SPACE: direct generation in fourier space</description>
						<possible_values>REAL_SPACE; FOURIER_SPACE</possible_values>
						<type>string</type>
						<value>REAL_SPACE</value>
						<default_value>REAL_SPACE</default_value>
					</Parameter>
					<Parameter name="periodic">
						<description>1: Generation of a periodic correlation domain</description>
						<possible_values/>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="exponential">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="gaussian">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<Parameter name="modification">
							<description>Modification of the correlation pattern in order to correlate more the larger values (PLUS), the smaller values (MINUS), to add fractures along the main flow direction (x) connecting the borders (F2) or not connecting the borders (F)</description>
							<possible_values>NO; PLUS; MINUS; F</possible_values>
							<type>string</type>
							<value>NO</value>
							<default_value>NO</default_value>
						</Parameter>
						<ParametersGroup name="F">
							<Parameter name="fraction_sizex">
								<description>length of fracture to be added: Lx/(fraction_sizex)</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="nb">
								<description>number of fractures to be added</description>
								<possible_values>&gt;0</possible_values>
								<type>int</type>
								<value>4</value>
								<default_value>4</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="power">
						<Parameter name="beta">
							<description>beta</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="cutoff">
							<description>cutoff length, 0&lt;val&lt;system size</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="power">
							<description>power</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="distribution">
					<Parameter name="distribution_type">
						<description>Type of value distribution. Each distribution is given a ParametersGroup for its parameters. </description>
						<possible_values>HOMO:constant; BINARY:binary distribution; UNIFORM:uniform distribution; NORMAL:Gaussian distribution; LOGNORMAL:Lognormal distribution; LOGUNIFORM:Loguniform distribution</possible_values>
						<type>string</type>
						<value>LOGNORMAL</value>
						<default_value>HOMO</default_value>
					</Parameter>
					<ParametersGroup name="binary">
						<Parameter name="val1">
							<description>first value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val2">
							<description>second value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="homo">
						<Parameter name="val">
							<description>Value of the homogeneous field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="lognormal">
						<Parameter name="lognormal_mean">
							<description>log-mean of the lognormal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="lognormal_std">
							<description>lof-standard deviation of the lognormal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="loguniform">
						<Parameter name="log_max">
							<description>log of ghe maximum of the loguniform distribution</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="log_min">
							<description>log of ghe minimum of the loguniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="normal">
						<Parameter name="mean">
							<description>mean of the normal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="std">
							<description>standard deviation of the normal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="uniform">
						<Parameter name="val_max">
							<description>maximum value of the uniform distribution </description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<Parameter name="val_min">
							<description>minimum value of the uniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="file_data">
					<Parameter name="column_name">
						<description>Name of the column to load, such as permeability, K1, porosity, velocity_x1, vz...</description>
						<possible_values/>
						<type>string</type>
						<value>property</value>
						<default_value>property</default_value>
					</Parameter>
					<Parameter name="file_path">
						<description>file path to get core values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
					<Parameter name="file_type">
						<description>type of file</description>
						<possible_values/>
						<type>string</type>
						<value>GOCAD</value>
						<default_value>GOCAD</default_value>
					</Parameter>
					<Parameter name="ref_file_path">
						<description>file path to get information about external values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="fracture">
					<Parameter name="aperture">
						<description>size of the aperture of the fracture (centered at the plan)</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="dip_angle">
						<description>angle (in degree) between the fracture plan and the horizontal plan</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="point_on_frac">
						<description>point on the fracture plan</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="strike_angle">
						<description>angle (in degree) between the fracture plan and the x axis</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="val_fracture">
						<description>value within the fracture</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="inclusions">
					<Parameter name="K_background">
						<description>background permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="K_inclusions">
						<description>inclusions permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_x">
						<description>characteristic distance between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_y">
						<description>characteristic distance of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="shape">
						<description>shape of the inclusions</description>
						<possible_values>SQUARE; RECTANGLE</possible_values>
						<type>string</type>
						<value>SQUARE</value>
						<default_value>SQUARE</default_value>
					</Parameter>
					<Parameter name="shift_x">
						<description>characteristic shift between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="shift_y">
						<description>characteristic shift of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_x">
						<description>characteristic size of the inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_y">
						<description>characteristic size of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="large_generation_param">
					<Parameter name="multiplication_factor">
						<description>Multiplication factor in terms of system size</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="lense">
					<Parameter name="position_lense">
						<description>point on the fracture plan; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="size_lense">
						<description>size of the aperture of the fracture (centered at the plan); for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.1,0.1,0.1]</value>
						<default_value>[0.1,0.1,0.1]</default_value>
					</Parameter>
					<Parameter name="val_lense">
						<description>value within the fracture; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="post_treatment">
					<Parameter name="analyses">
						<description>Type of geometrical characteristics computed on the field (classtats : neologism for classical stats &lt;=&gt;moments, min, max, standard deviation)</description>
						<possible_values>none; classtats; corr_length; cs4; s2_scaled; s2; cf1k; cf2k</possible_values>
						<type>string</type>
						<value>classtats</value>
						<default_value>classtats</default_value>
					</Parameter>
					<Parameter name="analyses_scale">
						<description>Scale with which the permeability field is analyzed</description>
						<possible_values>lin; log</possible_values>
						<type>string</type>
						<value>log</value>
						<default_value>log</default_value>
					</Parameter>
					<Parameter name="outputs">
						<description>Additional large outputs like no outputs, outputs in its own file (single) or ouputs in a general file (heap)</description>
						<possible_values>0 : no; 1: yes</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="outputs_format">
						<description>Different output formats</description>
						<possible_values>classic; gocad; vtk; vtk_flow_line:vtk with particle number</possible_values>
						<type>string</type>
						<value>classic</value>
						<default_value>classic</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="stratification">
					<Parameter name="distribution_type">
						<description>distribution of values in the strates</description>
						<possible_values>DEFAULT:the distribution defined before; STRAT_NB:the index of the row (if HORIZONTAL) or column (if VERTICAL) or processor (if PROC)</possible_values>
						<type>string</type>
						<value>DEFAULT</value>
						<default_value>DEFAULT</default_value>
					</Parameter>
					<Parameter name="stratification_type">
						<description>type of stratification</description>
						<possible_values>HORIZONTAL:use distribution_type parameter for each row; VERTICAL:use distribution_type parameter for each column; PROC:use distribution_type parameter for each processor; ANNULAR:use annular parameters group; ZONES2:use zones2 parameters group; FRACTURE_HORIZONTAL:use fracture_horizontal parameters group; PARABOLIC:see source code</possible_values>
						<type>string</type>
						<value>HORIZONTAL</value>
						<default_value>HORIZONTAL</default_value>
					</Parameter>
					<ParametersGroup name="annular">
						<Parameter name="exponent">
							<description>exponent of the power dependence towards the center</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="fracture_horizontal">
						<Parameter name="val_fracture">
							<description>value within the fracture</description>
							<possible_values/>
							<type>double</type>
							<value>10</value>
							<default_value>10</default_value>
						</Parameter>
						<Parameter name="val_matrix">
							<description>value within the matrix</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="zones2">
						<Parameter name="direction">
							<description>direction in which the property varies</description>
							<possible_values>0: X axis; 1: Y axi; 2: Z axis</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="val_down">
							<description>value on the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val_down_definition">
							<description>to know which parameter defines the value on the lower side</description>
							<possible_values>VAL_DOWN: use val_down; RATIO: use val_down_ratio; EXPONENTIAL: use val_down_exponential</possible_values>
							<type>string</type>
							<value>VAL_DOWN</value>
							<default_value>VAL_DOWN</default_value>
						</Parameter>
						<Parameter name="val_down_exponential">
							<description>values in the lower side are defined by val_up*exp(-d/val_down_exponential), where d is the distance to the separation function</description>
							<possible_values/>
							<type>double</type>
							<value>0.1</value>
							<default_value>0.1</default_value>
						</Parameter>
						<Parameter name="val_down_ratio">
							<description>ratio that multiplies val_up to define the value in the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>0.5</value>
							<default_value>0.5</default_value>
						</Parameter>
						<Parameter name="val_up">
							<description>value in the upper side</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<ParametersGroup name="separation_function">
							<Parameter name="separation_type">
								<description>topography of the separation between the 2 zones</description>
								<possible_values>CONST_MIDDLE: middle of the domain; LINEAR: use a 1D linear function along the X axis; FILE: load the separation function from a file</possible_values>
								<type>string</type>
								<value>CONST_MIDDLE</value>
								<default_value>CONST_MIDDLE</default_value>
							</Parameter>
							<ParametersGroup name="file">
								<Parameter name="file_path">
									<description>path of the topography file ; format is 1st column is i, 2nd column is k and 3rd column is topo</description>
									<possible_values/>
									<type>string</type>
									<value>NO_FILE</value>
									<default_value>NO_FILE</default_value>
								</Parameter>
								<Parameter name="file_type">
									<description>format of the topography file</description>
									<possible_values>BASIC: i k value; GRD: .grd file</possible_values>
									<type>string</type>
									<value>BASIC</value>
									<default_value>BASIC</default_value>
								</Parameter>
								<Parameter name="scale_factor">
									<description>factor to multiply the separation read in file (after shifting)</description>
									<possible_values/>
									<type>double</type>
									<value>1</value>
									<default_value>1</default_value>
								</Parameter>
								<Parameter name="shift">
									<description>shift the separation read in file, real [L]</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
							<ParametersGroup name="linear_function">
								<Parameter name="a">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0.02</value>
									<default_value>0.02</default_value>
								</Parameter>
								<Parameter name="y0">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
						</ParametersGroup>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="structure">
					<Parameter name="Vijk">
						<description>values in blocs, ordered by a loop on Z blocs inside a loop on Y blocs inside a loop on X blocs; V1*V2*...*Vnv with nv = (nx+1)*(ny+1)*(nz+1)</description>
						<possible_values/>
						<type>string</type>
						<value>1e-1</value>
						<default_value>1e-1</default_value>
					</Parameter>
					<Parameter name="X_limits">
						<description>limits between blocs in X direction; X1*X2*...*Xnx in Xdirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Y_limits">
						<description>limits between blocs in Y direction; Y1*Y2*...*Yny in Ydirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Z_limits">
						<description>limits between blocs in Z direction; Z1*Z2*...*Znz in Z direction</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="porosity">
			<ParametersGroup name="grid_property">
				<Parameter name="add_fracture">
					<description>activate or deactivate the addition of fracture over the field already generated (fracture is defined in fracture group)</description>
					<possible_values>0: no fracture added; 1: fracture added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="add_lense">
					<description>activate or deactivate the addition of lense over the field already generated (lense is defined in lense groups)</description>
					<possible_values>0: no lense added; 1: lenses added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="field_type">
					<description>Type of field in terms of structure. ParametersGroup distribution is required for the three first options. </description>
					<possible_values>NO_CORRELATION:random non correlated field; CORRELATION:MultiGaussian correlated field; STRATIFICATION:Stratified field; STRUCTURE:Block structured field; FRACTAL:fractal and multifractal correlations; FILE:enter field from a file; INCLUSIONS:inclusions in an homogeneous field</possible_values>
					<type>string</type>
					<value>NO_CORRELATION</value>
					<default_value>NO_CORRELATION</default_value>
				</Parameter>
				<Parameter name="large_generation">
					<description>generates the permeability field in a 10 times larger grid to avoid border effects</description>
					<possible_values>0: classical generation; 1: enlarging the generation</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<ParametersGroup name="correlation">
					<Parameter name="correlation_type">
						<description>type of correlation function</description>
						<possible_values>GAUSSIAN; EXPONENTIAL; POWER</possible_values>
						<type>string</type>
						<value>GAUSSIAN</value>
						<default_value>GAUSSIAN</default_value>
					</Parameter>
					<Parameter name="generation_type">
						<description>REAL_SPACE: generates the correlation function, discretizes it and fourier transfrom it, FOURIER_SPACE: direct generation in fourier space</description>
						<possible_values>REAL_SPACE; FOURIER_SPACE</possible_values>
						<type>string</type>
						<value>REAL_SPACE</value>
						<default_value>REAL_SPACE</default_value>
					</Parameter>
					<Parameter name="periodic">
						<description>1: Generation of a periodic correlation domain</description>
						<possible_values/>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="exponential">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="gaussian">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<Parameter name="modification">
							<description>Modification of the correlation pattern in order to correlate more the larger values (PLUS), the smaller values (MINUS), to add fractures along the main flow direction (x) connecting the borders (F2) or not connecting the borders (F)</description>
							<possible_values>NO; PLUS; MINUS; F</possible_values>
							<type>string</type>
							<value>NO</value>
							<default_value>NO</default_value>
						</Parameter>
						<ParametersGroup name="F">
							<Parameter name="fraction_sizex">
								<description>length of fracture to be added: Lx/(fraction_sizex)</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="nb">
								<description>number of fractures to be added</description>
								<possible_values>&gt;0</possible_values>
								<type>int</type>
								<value>4</value>
								<default_value>4</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="power">
						<Parameter name="beta">
							<description>beta</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="cutoff">
							<description>cutoff length, 0&lt;val&lt;system size</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="power">
							<description>power</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="distribution">
					<Parameter name="distribution_type">
						<description>Type of value distribution. Each distribution is given a ParametersGroup for its parameters. </description>
						<possible_values>HOMO:constant; BINARY:binary distribution; UNIFORM:uniform distribution; NORMAL:Gaussian distribution; LOGNORMAL:Lognormal distribution; LOGUNIFORM:Loguniform distribution</possible_values>
						<type>string</type>
						<value>HOMO</value>
						<default_value>HOMO</default_value>
					</Parameter>
					<ParametersGroup name="binary">
						<Parameter name="val1">
							<description>first value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val2">
							<description>second value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="homo">
						<Parameter name="val">
							<description>Value of the homogeneous field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="lognormal">
						<Parameter name="lognormal_mean">
							<description>log-mean of the lognormal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="lognormal_std">
							<description>lof-standard deviation of the lognormal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="loguniform">
						<Parameter name="log_max">
							<description>log of ghe maximum of the loguniform distribution</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="log_min">
							<description>log of ghe minimum of the loguniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="normal">
						<Parameter name="mean">
							<description>mean of the normal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="std">
							<description>standard deviation of the normal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="uniform">
						<Parameter name="val_max">
							<description>maximum value of the uniform distribution </description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<Parameter name="val_min">
							<description>minimum value of the uniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="file_data">
					<Parameter name="column_name">
						<description>Name of the column to load, such as permeability, K1, porosity, velocity_x1, vz...</description>
						<possible_values/>
						<type>string</type>
						<value>property</value>
						<default_value>property</default_value>
					</Parameter>
					<Parameter name="file_path">
						<description>file path to get core values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
					<Parameter name="file_type">
						<description>type of file</description>
						<possible_values/>
						<type>string</type>
						<value>GOCAD</value>
						<default_value>GOCAD</default_value>
					</Parameter>
					<Parameter name="ref_file_path">
						<description>file path to get information about external values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="fracture">
					<Parameter name="aperture">
						<description>size of the aperture of the fracture (centered at the plan)</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="dip_angle">
						<description>angle (in degree) between the fracture plan and the horizontal plan</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="point_on_frac">
						<description>point on the fracture plan</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="strike_angle">
						<description>angle (in degree) between the fracture plan and the x axis</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="val_fracture">
						<description>value within the fracture</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="inclusions">
					<Parameter name="K_background">
						<description>background permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="K_inclusions">
						<description>inclusions permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_x">
						<description>characteristic distance between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_y">
						<description>characteristic distance of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="shape">
						<description>shape of the inclusions</description>
						<possible_values>SQUARE; RECTANGLE</possible_values>
						<type>string</type>
						<value>SQUARE</value>
						<default_value>SQUARE</default_value>
					</Parameter>
					<Parameter name="shift_x">
						<description>characteristic shift between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="shift_y">
						<description>characteristic shift of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_x">
						<description>characteristic size of the inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_y">
						<description>characteristic size of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="large_generation_param">
					<Parameter name="multiplication_factor">
						<description>Multiplication factor in terms of system size</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="lense">
					<Parameter name="position_lense">
						<description>point on the fracture plan; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="size_lense">
						<description>size of the aperture of the fracture (centered at the plan); for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.1,0.1,0.1]</value>
						<default_value>[0.1,0.1,0.1]</default_value>
					</Parameter>
					<Parameter name="val_lense">
						<description>value within the fracture; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="post_treatment">
					<Parameter name="analyses">
						<description>Type of geometrical characteristics computed on the field (classtats : neologism for classical stats &lt;=&gt;moments, min, max, standard deviation)</description>
						<possible_values>none; classtats; corr_length; cs4; s2_scaled; s2; cf1k; cf2k</possible_values>
						<type>string</type>
						<value>classtats</value>
						<default_value>classtats</default_value>
					</Parameter>
					<Parameter name="analyses_scale">
						<description>Scale with which the permeability field is analyzed</description>
						<possible_values>lin; log</possible_values>
						<type>string</type>
						<value>log</value>
						<default_value>log</default_value>
					</Parameter>
					<Parameter name="outputs">
						<description>Additional large outputs like no outputs, outputs in its own file (single) or ouputs in a general file (heap)</description>
						<possible_values>0 : no; 1: yes</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="outputs_format">
						<description>Different output formats</description>
						<possible_values>classic; gocad; vtk; vtk_flow_line:vtk with particle number</possible_values>
						<type>string</type>
						<value>classic</value>
						<default_value>classic</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="stratification">
					<Parameter name="distribution_type">
						<description>distribution of values in the strates</description>
						<possible_values>DEFAULT:the distribution defined before; STRAT_NB:the index of the row (if HORIZONTAL) or column (if VERTICAL) or processor (if PROC)</possible_values>
						<type>string</type>
						<value>DEFAULT</value>
						<default_value>DEFAULT</default_value>
					</Parameter>
					<Parameter name="stratification_type">
						<description>type of stratification</description>
						<possible_values>HORIZONTAL:use distribution_type parameter for each row; VERTICAL:use distribution_type parameter for each column; PROC:use distribution_type parameter for each processor; ANNULAR:use annular parameters group; ZONES2:use zones2 parameters group; FRACTURE_HORIZONTAL:use fracture_horizontal parameters group; PARABOLIC:see source code</possible_values>
						<type>string</type>
						<value>HORIZONTAL</value>
						<default_value>HORIZONTAL</default_value>
					</Parameter>
					<ParametersGroup name="annular">
						<Parameter name="exponent">
							<description>exponent of the power dependence towards the center</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="fracture_horizontal">
						<Parameter name="val_fracture">
							<description>value within the fracture</description>
							<possible_values/>
							<type>double</type>
							<value>10</value>
							<default_value>10</default_value>
						</Parameter>
						<Parameter name="val_matrix">
							<description>value within the matrix</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="zones2">
						<Parameter name="direction">
							<description>direction in which the property varies</description>
							<possible_values>0: X axis; 1: Y axi; 2: Z axis</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="val_down">
							<description>value on the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val_down_definition">
							<description>to know which parameter defines the value on the lower side</description>
							<possible_values>VAL_DOWN: use val_down; RATIO: use val_down_ratio; EXPONENTIAL: use val_down_exponential</possible_values>
							<type>string</type>
							<value>VAL_DOWN</value>
							<default_value>VAL_DOWN</default_value>
						</Parameter>
						<Parameter name="val_down_exponential">
							<description>values in the lower side are defined by val_up*exp(-d/val_down_exponential), where d is the distance to the separation function</description>
							<possible_values/>
							<type>double</type>
							<value>0.1</value>
							<default_value>0.1</default_value>
						</Parameter>
						<Parameter name="val_down_ratio">
							<description>ratio that multiplies val_up to define the value in the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>0.5</value>
							<default_value>0.5</default_value>
						</Parameter>
						<Parameter name="val_up">
							<description>value in the upper side</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<ParametersGroup name="separation_function">
							<Parameter name="separation_type">
								<description>topography of the separation between the 2 zones</description>
								<possible_values>CONST_MIDDLE: middle of the domain; LINEAR: use a 1D linear function along the X axis; FILE: load the separation function from a file</possible_values>
								<type>string</type>
								<value>CONST_MIDDLE</value>
								<default_value>CONST_MIDDLE</default_value>
							</Parameter>
							<ParametersGroup name="file">
								<Parameter name="file_path">
									<description>path of the topography file ; format is 1st column is i, 2nd column is k and 3rd column is topo</description>
									<possible_values/>
									<type>string</type>
									<value>NO_FILE</value>
									<default_value>NO_FILE</default_value>
								</Parameter>
								<Parameter name="file_type">
									<description>format of the topography file</description>
									<possible_values>BASIC: i k value; GRD: .grd file</possible_values>
									<type>string</type>
									<value>BASIC</value>
									<default_value>BASIC</default_value>
								</Parameter>
								<Parameter name="scale_factor">
									<description>factor to multiply the separation read in file (after shifting)</description>
									<possible_values/>
									<type>double</type>
									<value>1</value>
									<default_value>1</default_value>
								</Parameter>
								<Parameter name="shift">
									<description>shift the separation read in file, real [L]</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
							<ParametersGroup name="linear_function">
								<Parameter name="a">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0.02</value>
									<default_value>0.02</default_value>
								</Parameter>
								<Parameter name="y0">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
						</ParametersGroup>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="structure">
					<Parameter name="Vijk">
						<description>values in blocs, ordered by a loop on Z blocs inside a loop on Y blocs inside a loop on X blocs; V1*V2*...*Vnv with nv = (nx+1)*(ny+1)*(nz+1)</description>
						<possible_values/>
						<type>string</type>
						<value>1e-1</value>
						<default_value>1e-1</default_value>
					</Parameter>
					<Parameter name="X_limits">
						<description>limits between blocs in X direction; X1*X2*...*Xnx in Xdirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Y_limits">
						<description>limits between blocs in Y direction; Y1*Y2*...*Yny in Ydirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Z_limits">
						<description>limits between blocs in Z direction; Z1*Z2*...*Znz in Z direction</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="simulation_general">
			<ParametersGroup name="head_field">
				<ParametersGroup name="file_data">
					<Parameter name="file_type">
						<description>Type of data file used to save head field</description>
						<possible_values>GOCAD</possible_values>
						<type>string</type>
						<value>GOCAD</value>
						<default_value>GOCAD</default_value>
					</Parameter>
					<Parameter name="ref_file_path">
						<description>Reference file for gocad type</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="post_treatment">
					<Parameter name="analyses">
						<description>Type of characteristics computed on the head field</description>
						<possible_values>none;corr_length;cs4;s2_scaled;s2;cf1k;cf2k</possible_values>
						<type>string</type>
						<value>corr_length+s2+s2_scaled+cf1k+cf2k</value>
						<default_value>corr_length+s2+s2_scaled+cf1k+cf2k</default_value>
					</Parameter>
					<Parameter name="analyses_scale">
						<description>Scale with which the head field is analyzed and saved : linear (lin), logarithmic (log)</description>
						<possible_values>lin;log</possible_values>
						<type>string</type>
						<value>log</value>
						<default_value>log</default_value>
					</Parameter>
					<Parameter name="outputs">
						<description>Activates (1) or desactivates (0) the outputs of head field</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="outputs_format">
						<description>Format of outputs (including headings format). For classic format, headings are the variables names</description>
						<possible_values>classic;gocad;vtk</possible_values>
						<type>string</type>
						<value>classic</value>
						<default_value>classic</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
			<ParametersGroup name="seeds_porous">
				<Parameter name="GENERATION">
					<description>no_description</description>
					<possible_values/>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="simulation_type">
				<Parameter name="aquifer_condition">
					<description>Flow computation is performed under confined (0) or unconfined (1) conditions. Under unconfined conditions, flow computation is performed with a free surface algorithm.</description>
					<possible_values>0;1</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="backward_time">
					<description>Activates (1) or desactivates (0) the resolution of transport in backward time</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="display_screen">
					<description>Different degrees of messages display: no message (0), just advancement (1)</description>
					<possible_values>0;1</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="flow">
					<description>Activates (1) or desactivates (0) the simulation of flow</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="flow_obtention">
					<description>Internal COMPUTATION of flow from permeability field or GENERATION of flow from the grid_property input file corresponding</description>
					<possible_values>COMPUTATION;GENERATION</possible_values>
					<type>string</type>
					<value>COMPUTATION</value>
					<default_value>COMPUTATION</default_value>
				</Parameter>
				<Parameter name="flow_state">
					<description>Choice of the flow simulation : steady (0), transient (1), quasi-steady for temporal fluctuation studies (2), semi-transient (3)</description>
					<possible_values>0;1;2;3</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="transport">
					<description>Activates (1) or desactivates (0) the simulation of transport (Tracker method)</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="water_budget">
				<Parameter name="wb_computation">
					<description>Activates (1) or desactivates (0) the computation of the water budget (between zones and with limits). CAUTION : zones obtention must be different of NO</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="zones">
				<Parameter name="zones_obtention">
					<description>NO obtention, internal COMPUTATION or READING from a file of permeability zones</description>
					<possible_values>NO;COMPUTATION;READING</possible_values>
					<type>string</type>
					<value>NO</value>
					<default_value>NO</default_value>
				</Parameter>
				<ParametersGroup name="file_data">
					<Parameter name="column_name">
						<description>Name of the column to extract from the data file in file_path</description>
						<possible_values/>
						<type>string</type>
						<value>zones</value>
						<default_value>zones</default_value>
					</Parameter>
					<Parameter name="file_path">
						<description>File path to get data</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
					<Parameter name="file_type">
						<description>Type of data file used to read and save permeability zones</description>
						<possible_values>GOCAD</possible_values>
						<type>string</type>
						<value>GOCAD</value>
						<default_value>GOCAD</default_value>
					</Parameter>
					<Parameter name="ref_file_path">
						<description>Reference file for gocad type to read and save permeability zones</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="post_treatment">
					<Parameter name="analyses_scale">
						<description>Scale with which the zone field is analyzed and saved : linear (lin), logarithmic (log)</description>
						<possible_values>lin;log</possible_values>
						<type>string</type>
						<value>log</value>
						<default_value>log</default_value>
					</Parameter>
					<Parameter name="outputs">
						<description>Activates (1) or desactivates (0) the outputs of permeability zones</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="outputs_format">
						<description>Format of outputs (including headings format). For classic format, headings are the variables names</description>
						<possible_values>classic;gocad;vtk</possible_values>
						<type>string</type>
						<value>classic</value>
						<default_value>classic</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="time_fluctuations">
			<Parameter name="correlation_coefficient">
				<description>Correlation coefficient between the main flow direction and the secondary flow directions</description>
				<possible_values>[0;1]</possible_values>
				<type>double</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<ParametersGroup name="direction_main_flow">
				<Parameter name="amplitude">
					<description>amplitude of the perturbation (amplitude of the square or std of the random distribution)</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="correlation">
					<description>correlation time of  the fluctuations (correlation length or length of the square)</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>10</value>
					<default_value>10</default_value>
				</Parameter>
				<Parameter name="discretization">
					<description>Number of discretization steps of the correlation length</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>10</value>
					<default_value>10</default_value>
				</Parameter>
				<Parameter name="fixed_component">
					<description>fixed component to which will be added the fluctuations</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="type">
					<description>type of temporal correlation</description>
					<possible_values>steady; square; correlation_gaussian; sinusoidal</possible_values>
					<type>string</type>
					<value>steady</value>
					<default_value>steady</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="direction_secondary_flow">
				<Parameter name="amplitude">
					<description>amplitude of the perturbation (amplitude of the square or std of the random distribution)</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="correlation">
					<description>correlation time of  the fluctuations (correlation length or length of the square)</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>10</value>
					<default_value>10</default_value>
				</Parameter>
				<Parameter name="discretization">
					<description>Number of discretization steps of the correlation length</description>
					<possible_values>&gt;0</possible_values>
					<type>double</type>
					<value>10</value>
					<default_value>10</default_value>
				</Parameter>
				<Parameter name="fixed_component">
					<description>fixed component to which will be added the fluctuations</description>
					<possible_values>&gt;=0</possible_values>
					<type>double</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="type">
					<description>type of correlation</description>
					<possible_values>steady; square; correlation_gaussian; sinusoidal</possible_values>
					<type>string</type>
					<value>correlation_gaussian</value>
					<default_value>correlation_gaussian</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="seeds_time_fluctuations">
				<Parameter name="GENERATION">
					<description>Random Number for the generation of time fluctuations</description>
					<possible_values>0</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="tracker">
			<Parameter name="analysis_and_outputs">
				<description>Categories of results to fill and output separated by #: tracker_vectors, tracker_distributions, tracker_concentrations, tracker_concentrations_correlation, tracker_asymptotic, tracker_channeling, tracker_paths, , tracker_paths, tracker_lagrangian_correlation_time, tracker_lagrangian_correlation_space</description>
				<possible_values/>
				<type>string</type>
				<value>tracker_vectors#tracker_distributions#tracker_asymptotic#tracker_paths#tracker_lagrangian_correlation_time# tracker_lagrangian_correlation_space</value>
				<default_value>tracker_vectors#tracker_distributions#tracker_channeling#tracker_asymptotic#tracker_paths</default_value>
			</Parameter>
			<Parameter name="method_type">
				<description>Type of method used for the random walk computation: Continuous Time Random Walk (0), Discrete Time Random Walk (1)</description>
				<possible_values>0;1</possible_values>
				<type>short</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="nb_step_by_mesh">
				<description>Average number of steps taken by a particle within a single mesh</description>
				<possible_values>&gt;=1</possible_values>
				<type>int</type>
				<value>10</value>
				<default_value>10</default_value>
			</Parameter>
			<Parameter name="parallel_communication_type">
				<description>Communication type between processors: Cascade (0), Pairwise (1)</description>
				<possible_values>0;1</possible_values>
				<type>short</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="particle_storage">
				<description>Activates (1) or desactivates (0) the storage of characteristics of particles path</description>
				<possible_values>0;1</possible_values>
				<type>bool</type>
				<value>0</value>
				<default_value>0</default_value>
			</Parameter>
			<Parameter name="particle_type">
				<description>Type of particle: LV=Lagrangian volume, RW=Random Walk, RW_history=Random Walk with history about path</description>
				<possible_values>LV;RW;RW_history</possible_values>
				<type>string</type>
				<value>RW_history</value>
				<default_value>RW_history</default_value>
			</Parameter>
			<Parameter name="path_format">
				<description>Format of the output of particles paths: none=does not export particles path, gocad=export for reading in gocad, gocad_geo=export for reading in gocad with a georeferenced system detailed in ref_file, vtk=export for reading in vtk</description>
				<possible_values>none;gocad;gocad_geo;vtk;vtk_flow_line</possible_values>
				<type>string</type>
				<value>none</value>
				<default_value>none</default_value>
			</Parameter>
			<Parameter name="ref_file">
				<description>Reference file for output of particles paths in case of gocad_geo</description>
				<possible_values/>
				<type>string</type>
				<value>NO_FILE</value>
				<default_value>NO_FILE</default_value>
			</Parameter>
			<Parameter name="tracker_paths_options">
				<description>Indicates options for tracker_paths results to store for each particle: travel_time, partial_travel_time, injection_zone_id, injection_position, exit_position, extrema_position (in each direction, the maximum and minimum point reached along the path)</description>
				<possible_values>travel_time#partial_travel_time#travel_distance#injection_zone_id#injection_position#exit_position#extrema_position</possible_values>
				<type>string</type>
				<value>travel_time#exit_position</value>
				<default_value>travel_time#exit_position</default_value>
			</Parameter>
			<ParametersGroup name="console_display">
				<Parameter name="display_type">
					<description>Display with tabulations as separators (0) or with fixed width (1)</description>
					<possible_values>0;1</possible_values>
					<type>short</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="injector">
					<description>Displays the injection of particles (1) or not (0)</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="particle_movements">
					<description>Displays the evolving positions of the particles: no display (0), display only particles (1) or display particles and meshes (2)</description>
					<possible_values>0;1;2</possible_values>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="injection_restricted">
				<Parameter name="active">
					<description>Activate injection restricted to a limited number of particles (1) or not (0)</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="no">
					<description>Character string with the number of particles to run separated by the # character</description>
					<possible_values/>
					<type>string</type>
					<value>10#20</value>
					<default_value>10#20</default_value>
				</Parameter>
			</ParametersGroup>
			<ParametersGroup name="seeds_tracker">
				<Parameter name="INPUT_POSITION">
					<description>Seeds for the input positions of the Walkers</description>
					<possible_values/>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="TRACKER">
					<description>Random number for particle tracking (diffusion-dispersion)</description>
					<possible_values/>
					<type>short</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="tracker_RW">
			<Parameter name="injection_concentrations">
				<description>History of injected concentrations. Form is : C1=1*C1=0.5*..*Cn=Value n</description>
				<possible_values/>
				<type>string</type>
				<value>C1=1*C2=0.5*C3=0.25</value>
				<default_value>C1=1*C2=0.5*C3=0.25</default_value>
			</Parameter>
			<Parameter name="injection_stage_number">
				<description>Number of injection stages (number of particles injected at each stage = number of particles / number of stages)</description>
				<possible_values>&gt;=1</possible_values>
				<type>int</type>
				<value>10</value>
				<default_value>10</default_value>
			</Parameter>
			<Parameter name="particles_number">
				<description>Number of particles</description>
				<possible_values>&gt;=0</possible_values>
				<type>int</type>
				<value>1000</value>
				<default_value>1000</default_value>
			</Parameter>
			<ParametersGroup name="tracker_early_stop">
				<Parameter name="stop">
					<description>Stops the particles tracking when the fastest particle leaves the domain (1) or tracks the particles until all particles have left the system (0)</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="transport">
			<ParametersGroup name="injection">
				<Parameter name="injection_graph">
					<description>Composition of injection parameters : spatial*temporal*concentration, such as Z1*T1*C1#Z2*T1*C1#Z2*T2*C2, X_LOW*DIRAC*C1, X_LOW*DIRAC*C1#Y_HIGH*DIRAC*C1</description>
					<possible_values/>
					<type>string</type>
					<value>WINDOW*DIRAC*C1</value>
					<default_value>WINDOW*DIRAC*C1</default_value>
				</Parameter>
				<ParametersGroup name="options">
					<Parameter name="injection_type">
						<description>Types of injection: Random in Window (0), Random in Mesh Vertical (1), Deterministic (2), at Meshing Center (3), From Fixed Positions (4), Random in Mesh (5), </description>
						<possible_values> 0;1;2;3;4;5</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="side_zone">
						<description>side zone along the sides</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0.1</value>
						<default_value>0.1</default_value>
					</Parameter>
					<Parameter name="simple_or_flow">
						<description>Injection is proportional to zone's volume (0) or proportional to zone's volume * flow (1)</description>
						<possible_values>0;1</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="volume_or_contour">
						<description>Injected is done into the whole volume (0) or in the contour (1) of the injection zone</description>
						<possible_values>0;1</possible_values>
						<type>short</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="deterministic">
						<Parameter name="nb_X">
							<description>Number of elements along X for regular repartition, for each zone of the injection graph; USED WHEN simple_or_flow=0</description>
							<possible_values>&gt;=0</possible_values>
							<type>string</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="nb_Y">
							<description>Number of elements along Y for regular repartition, for each zone of the injection graph such as nb_Y or nb_Y_zone1#nb_Y_zone2; USED WHEN simple_or_flow=0</description>
							<possible_values>&gt;=0</possible_values>
							<type>string</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="nb_Z">
							<description>Number of elements along Z for regular repartition, for each zone of the injection graph such as nb_Z or nb_Z_zone1#nb_Z_zone2; USED WHEN simple_or_flow=0</description>
							<possible_values>&gt;=0</possible_values>
							<type>string</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="nb_tot">
							<description>Total number of elements to inject for each zone of the injection graph such as nb_tot or nb_tot_zone1#nb_tot_zone2 such as nb_X or nb_X_zone1#nb_X_zone2...;  USED WHEN simple_or_flow=1</description>
							<possible_values>&gt;=0</possible_values>
							<type>string</type>
							<value>50</value>
							<default_value>50</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="spatial">
					<Parameter name="spatial_border">
						<description>Input border such as X_LOW, Y_HIGH, X_LOW#Y_HIGH</description>
						<possible_values/>
						<type>string</type>
						<value>X_LOW</value>
						<default_value>X_LOW</default_value>
					</Parameter>
					<Parameter name="spatial_manual">
						<description>input zones : Z1 = xmin/ymin/zmin*xmax/ymax/zmax</description>
						<possible_values/>
						<type>string</type>
						<value>Z1=[0.1,0.2,0]*[0.1,0.4, 0]#Z2=[0.2,0.6,0]*[0.2,0.8, 0]</value>
						<default_value>Z1=[0.1,0.2,0]*[0.1,0.4, 0]#Z2=[0.2,0.6,0]*[0.2,0.8, 0]</default_value>
					</Parameter>
					<Parameter name="spatial_window">
						<description>proportion of the system size</description>
						<possible_values>]0;1[</possible_values>
						<type>double</type>
						<value>0.4</value>
						<default_value>0.4</default_value>
					</Parameter>
					<Parameter name="zone_spatial_auto">
						<description>Type of automatically generated injection zone</description>
						<possible_values>MANUAL;WINDOW;BORDER</possible_values>
						<type>string</type>
						<value>WINDOW</value>
						<default_value>WINDOW</default_value>
					</Parameter>
					<Parameter name="zone_spatial_type">
						<description>Injection domain defined in proportion of the system size, defined from positions or in meshes number. PROPORTION, POSITION and MESH_BORDERS_ENGLOBING_POSITION are implemented for MANUAL, PROPORTION and MESH are implemented for WINDOW</description>
						<possible_values>PROPORTION;MESH;POSITION; MESH_BORDERS_ENGLOBING_POSITION </possible_values>
						<type>string</type>
						<value>PROPORTION</value>
						<default_value>PROPORTION</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="temporal">
					<Parameter name="time_interval_auto">
						<description>Type of automatically generated injection time</description>
						<possible_values>MANUAL;DIRAC;STEP;CONTINUOUS</possible_values>
						<type>string</type>
						<value>DIRAC</value>
						<default_value>DIRAC</default_value>
					</Parameter>
					<Parameter name="time_manual">
						<description>Time interval for manual temporal injection</description>
						<possible_values/>
						<type>string</type>
						<value>T1=0/10#T2=20/30</value>
						<default_value>T1=0/10#T2=20/30</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
			<ParametersGroup name="physics">
				<Parameter name="pure_advection">
					<description>Activates (1) or desactivates (0) pure advection, infinite Peclet number in case of pure advection</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<ParametersGroup name="diffusion">
					<Parameter name="diffusion_coeff_computation">
						<description>Choice of the way to determine molecular diffusion coefficient : directly (0) or via Peclet number (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="diffusion_coefficient">
						<description>Diffusion coefficient (units: length^2/time)</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0.001</value>
						<default_value>0.001</default_value>
					</Parameter>
					<Parameter name="peclet_number">
						<description>Peclet number</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>1000</value>
						<default_value>1000</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="dispersion">
					<Parameter name="alpha_longitudinal">
						<description>Longitudinal dispersivity (along axis x)</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0.1</value>
						<default_value>0.1</default_value>
					</Parameter>
					<Parameter name="alpha_transversaly">
						<description>Transversal dispersivity (along axis y)</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0.01</value>
						<default_value>0.01</default_value>
					</Parameter>
					<Parameter name="alpha_transversalz">
						<description>Transversal dispersivity (along axis z)</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0.01</value>
						<default_value>0.01</default_value>
					</Parameter>
					<Parameter name="discontinuity_correction">
						<description>Treatment of the particles transfer across a discontinuity: no correction (0), drift term (1), Hoteit reflection-2002 (2), Hoteit reflection and drift term (3) </description>
						<possible_values>0;1;2;3</possible_values>
						<type>short</type>
						<value>3</value>
						<default_value>3</default_value>
					</Parameter>
					<Parameter name="hydrodynamic_dispersion">
						<description>Activates (1) or desactivates (0) hydrodynamic dispersion</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>1</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
			<ParametersGroup name="storage">
				<Parameter name="mesh_storage">
					<description>Keep in memory mesh structure for display purposes: keep (0), remove (1)</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<Parameter name="stat_storage">
					<description>Activates (1) or desactivates (0) storage of statistics</description>
					<possible_values>0;1</possible_values>
					<type>bool</type>
					<value>1</value>
					<default_value>1</default_value>
				</Parameter>
				<ParametersGroup name="concentrations">
					<Parameter name="it">
						<description>Concentration will be output each it*nt step (it is given in % of the maximum index)</description>
						<possible_values>]0;100[</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="concentrations_correlation">
					<Parameter name="NRW">
						<description>Number of particles on which will be performed the concentration correlation</description>
						<possible_values>&gt;0</possible_values>
						<type>int</type>
						<value>1000</value>
						<default_value>1000</default_value>
					</Parameter>
					<Parameter name="it">
						<description>Correlations will be computed each it*nt step (it is given in % of the maximum index)</description>
						<possible_values>]0;100[</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="limited_NRW">
						<description>Limits the number of particles on which will be performed the correlation analysis</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="nr">
						<description>Number of radii for the discretization of the correlation function</description>
						<possible_values>&gt;0</possible_values>
						<type>int</type>
						<value>100</value>
						<default_value>100</default_value>
					</Parameter>
					<Parameter name="rmax">
						<description>Maximal distance at which the correlation function will be computed</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="rmax_reference">
						<description>Type of reference used for the computation of rmax: real distance (0), 1% of the maximal size (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="rmin">
						<description>Minimal distance at which the correlation function will be computed</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0.1</value>
						<default_value>0.1</default_value>
					</Parameter>
					<Parameter name="rmin_reference">
						<description>Type of reference used for the computation of rmin: real distance (0), 1% of the maximal size (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="scale_c">
						<description>Type of sampling scale : linear (0), logarithmic (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="lagrangian_correlation_storage">
					<Parameter name="coeff_vmax">
						<description>coefficient for estimating vmax</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="coeff_vmin">
						<description>coefficient for estimating vmin</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="nb_k">
						<description>Number of time or space steps in sampling</description>
						<possible_values>&gt;=1</possible_values>
						<type>int</type>
						<value>2</value>
						<default_value>2</default_value>
					</Parameter>
					<Parameter name="nv">
						<description>Number of classes on sampling scale</description>
						<possible_values>&gt;=1</possible_values>
						<type>int</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="reference_vmax_storage">
						<description>Estimation of maximum value : imposed vmax (0) ; vmax = vmax * coeff_vmax (1)</description>
						<possible_values>0;1</possible_values>
						<type>int</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="reference_vmin_storage">
						<description>Estimation of minimum value : imposed vmin (0),  vmin = vmin * coeff_vmin (1) </description>
						<possible_values>0;1</possible_values>
						<type>int</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="scale_v">
						<description>Type of sampling scale : linear (0), logarithmic (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="vnorm_vmax">
						<description>Maximum value of velocity norm</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="vnorm_vmin">
						<description>Minimum value of velocity norm</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="vx_vmax">
						<description>Maximum value of velocity component in direction x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="vx_vmin">
						<description>Minimum value of velocity component in direction x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="vy_vmax">
						<description>Maximum value of velocity component in direction y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="vy_vmin">
						<description>Minimum value of velocity component in direction y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="vz_vmax">
						<description>Maximum value of velocity component in direction z</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="vz_vmin">
						<description>Minimum value of velocity component in direction z</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="time_storage">
					<Parameter name="coeff_tmax">
						<description>coeff_tmax is set as Maximum time stored / First breakthrough time</description>
						<possible_values>&gt; 0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="coeff_tmin">
						<description>coeff_tmin is such that tmin = coeff_tmin*tmax,  for reference_tmin_storage=1</description>
						<possible_values>[0;1[</possible_values>
						<type>double</type>
						<value>1e-05</value>
						<default_value>1e-05</default_value>
					</Parameter>
					<Parameter name="nt">
						<description>Sampling in time scale</description>
						<possible_values>&gt;0</possible_values>
						<type>int</type>
						<value>1000</value>
						<default_value>1000</default_value>
					</Parameter>
					<Parameter name="reference_tmax_storage">
						<description>Reference for the last storage time: mininmal breakthrough time * coeff_tmax (0) ; maximal breakthrough time (1) ; tmax (2)</description>
						<possible_values>0;1;2</possible_values>
						<type>int</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="reference_tmin_storage">
						<description>Reference for the first storage time: tmin (0); coeff_tmin*tmax (with tmax defined as indicated by reference_tmax_storage)</description>
						<possible_values>0;1</possible_values>
						<type>int</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="scale_time">
						<description>Type of sampling scale : linear (0), logarithmic (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="tmax">
						<description>Maximum time stored</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1000</value>
						<default_value>1000</default_value>
					</Parameter>
					<Parameter name="tmin">
						<description>Minimum time stored</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="velocity_storage">
					<Parameter name="nv">
						<description>Sampling in velocity</description>
						<possible_values>&gt;0</possible_values>
						<type>int</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="scale_v">
						<description>Type of sampling scale : linear (0), logarithmic (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="vmax">
						<description>Maximum value in v stored</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>100</value>
						<default_value>100</default_value>
					</Parameter>
					<Parameter name="vmin">
						<description>Minimum value in v stored</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0.0001</value>
						<default_value>0.0001</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="x_storage">
					<Parameter name="nx">
						<description>Sampling in direction x</description>
						<possible_values>&gt;0</possible_values>
						<type>int</type>
						<value>100</value>
						<default_value>100</default_value>
					</Parameter>
					<Parameter name="scale_x">
						<description>Type of sampling scale : linear (0), logarithmic (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="xmax">
						<description>Maximum position in x stored</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="xmin">
						<description>Minimum position in x stored</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="y_storage">
					<Parameter name="ny">
						<description>Sampling in direction y</description>
						<possible_values>&gt;0</possible_values>
						<type>int</type>
						<value>100</value>
						<default_value>100</default_value>
					</Parameter>
					<Parameter name="scale_y">
						<description>Type of sampling scale : linear (0), logarithmic (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="ymax">
						<description>Maximum position in y stored</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="ymin">
						<description>Minimum position in y stored</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="z_storage">
					<Parameter name="nz">
						<description>Sampling in direction z</description>
						<possible_values>&gt;0</possible_values>
						<type>int</type>
						<value>100</value>
						<default_value>100</default_value>
					</Parameter>
					<Parameter name="scale_z">
						<description>Type of sampling scale : linear (0), logarithmic (1)</description>
						<possible_values>0;1</possible_values>
						<type>bool</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="zmax">
						<description>Maximum position in z stored</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="zmin">
						<description>Minimum position in z stored</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="velocity_norm">
			<ParametersGroup name="grid_property">
				<Parameter name="add_fracture">
					<description>activate or deactivate the addition of fracture over the field already generated (fracture is defined in fracture group)</description>
					<possible_values>0: no fracture added; 1: fracture added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="add_lense">
					<description>activate or deactivate the addition of lense over the field already generated (lense is defined in lense groups)</description>
					<possible_values>0: no lense added; 1: lenses added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="field_type">
					<description>Type of field in terms of structure. ParametersGroup distribution is required for the three first options. </description>
					<possible_values>NO_CORRELATION:random non correlated field; CORRELATION:MultiGaussian correlated field; STRATIFICATION:Stratified field; STRUCTURE:Block structured field; FRACTAL:fractal and multifractal correlations; FILE:enter field from a file; INCLUSIONS:inclusions in an homogeneous field</possible_values>
					<type>string</type>
					<value>NO_CORRELATION</value>
					<default_value>NO_CORRELATION</default_value>
				</Parameter>
				<Parameter name="large_generation">
					<description>generates the permeability field in a 10 times larger grid to avoid border effects</description>
					<possible_values>0: classical generation; 1: enlarging the generation</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<ParametersGroup name="correlation">
					<Parameter name="correlation_type">
						<description>type of correlation function</description>
						<possible_values>GAUSSIAN; EXPONENTIAL; POWER</possible_values>
						<type>string</type>
						<value>GAUSSIAN</value>
						<default_value>GAUSSIAN</default_value>
					</Parameter>
					<Parameter name="generation_type">
						<description>REAL_SPACE: generates the correlation function, discretizes it and fourier transfrom it, FOURIER_SPACE: direct generation in fourier space</description>
						<possible_values>REAL_SPACE; FOURIER_SPACE</possible_values>
						<type>string</type>
						<value>REAL_SPACE</value>
						<default_value>REAL_SPACE</default_value>
					</Parameter>
					<Parameter name="periodic">
						<description>1: Generation of a periodic correlation domain</description>
						<possible_values/>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="exponential">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="gaussian">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<Parameter name="modification">
							<description>Modification of the correlation pattern in order to correlate more the larger values (PLUS), the smaller values (MINUS), to add fractures along the main flow direction (x) connecting the borders (F2) or not connecting the borders (F)</description>
							<possible_values>NO; PLUS; MINUS; F</possible_values>
							<type>string</type>
							<value>NO</value>
							<default_value>NO</default_value>
						</Parameter>
						<ParametersGroup name="F">
							<Parameter name="fraction_sizex">
								<description>length of fracture to be added: Lx/(fraction_sizex)</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="nb">
								<description>number of fractures to be added</description>
								<possible_values>&gt;0</possible_values>
								<type>int</type>
								<value>4</value>
								<default_value>4</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="power">
						<Parameter name="beta">
							<description>beta</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="cutoff">
							<description>cutoff length, 0&lt;val&lt;system size</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="power">
							<description>power</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="distribution">
					<Parameter name="distribution_type">
						<description>Type of value distribution. Each distribution is given a ParametersGroup for its parameters. </description>
						<possible_values>HOMO:constant; BINARY:binary distribution; UNIFORM:uniform distribution; NORMAL:Gaussian distribution; LOGNORMAL:Lognormal distribution; LOGUNIFORM:Loguniform distribution</possible_values>
						<type>string</type>
						<value>HOMO</value>
						<default_value>HOMO</default_value>
					</Parameter>
					<ParametersGroup name="binary">
						<Parameter name="val1">
							<description>first value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val2">
							<description>second value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="homo">
						<Parameter name="val">
							<description>Value of the homogeneous field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="lognormal">
						<Parameter name="lognormal_mean">
							<description>log-mean of the lognormal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="lognormal_std">
							<description>lof-standard deviation of the lognormal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="loguniform">
						<Parameter name="log_max">
							<description>log of ghe maximum of the loguniform distribution</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="log_min">
							<description>log of ghe minimum of the loguniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="normal">
						<Parameter name="mean">
							<description>mean of the normal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="std">
							<description>standard deviation of the normal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="uniform">
						<Parameter name="val_max">
							<description>maximum value of the uniform distribution </description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<Parameter name="val_min">
							<description>minimum value of the uniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="file_data">
					<Parameter name="column_name">
						<description>Name of the column to load, such as permeability, K1, porosity, velocity_x1, vz...</description>
						<possible_values/>
						<type>string</type>
						<value>property</value>
						<default_value>property</default_value>
					</Parameter>
					<Parameter name="file_path">
						<description>file path to get core values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
					<Parameter name="file_type">
						<description>type of file</description>
						<possible_values/>
						<type>string</type>
						<value>GOCAD</value>
						<default_value>GOCAD</default_value>
					</Parameter>
					<Parameter name="ref_file_path">
						<description>file path to get information about external values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="fracture">
					<Parameter name="aperture">
						<description>size of the aperture of the fracture (centered at the plan)</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="dip_angle">
						<description>angle (in degree) between the fracture plan and the horizontal plan</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="point_on_frac">
						<description>point on the fracture plan</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="strike_angle">
						<description>angle (in degree) between the fracture plan and the x axis</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="val_fracture">
						<description>value within the fracture</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="inclusions">
					<Parameter name="K_background">
						<description>background permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="K_inclusions">
						<description>inclusions permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_x">
						<description>characteristic distance between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_y">
						<description>characteristic distance of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="shape">
						<description>shape of the inclusions</description>
						<possible_values>SQUARE; RECTANGLE</possible_values>
						<type>string</type>
						<value>SQUARE</value>
						<default_value>SQUARE</default_value>
					</Parameter>
					<Parameter name="shift_x">
						<description>characteristic shift between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="shift_y">
						<description>characteristic shift of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_x">
						<description>characteristic size of the inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_y">
						<description>characteristic size of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="large_generation_param">
					<Parameter name="multiplication_factor">
						<description>Multiplication factor in terms of system size</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="lense">
					<Parameter name="position_lense">
						<description>point on the fracture plan; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="size_lense">
						<description>size of the aperture of the fracture (centered at the plan); for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.1,0.1,0.1]</value>
						<default_value>[0.1,0.1,0.1]</default_value>
					</Parameter>
					<Parameter name="val_lense">
						<description>value within the fracture; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="post_treatment">
					<Parameter name="analyses">
						<description>Type of geometrical characteristics computed on the field (classtats : neologism for classical stats &lt;=&gt;moments, min, max, standard deviation)</description>
						<possible_values>none; classtats; corr_length; cs4; s2_scaled; s2; cf1k; cf2k</possible_values>
						<type>string</type>
						<value>classtats</value>
						<default_value>classtats</default_value>
					</Parameter>
					<Parameter name="analyses_scale">
						<description>Scale with which the permeability field is analyzed</description>
						<possible_values>lin; log</possible_values>
						<type>string</type>
						<value>log</value>
						<default_value>log</default_value>
					</Parameter>
					<Parameter name="outputs">
						<description>Additional large outputs like no outputs, outputs in its own file (single) or ouputs in a general file (heap)</description>
						<possible_values>0 : no; 1: yes</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="outputs_format">
						<description>Different output formats</description>
						<possible_values>classic; gocad; vtk; vtk_flow_line:vtk with particle number</possible_values>
						<type>string</type>
						<value>classic</value>
						<default_value>classic</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="stratification">
					<Parameter name="distribution_type">
						<description>distribution of values in the strates</description>
						<possible_values>DEFAULT:the distribution defined before; STRAT_NB:the index of the row (if HORIZONTAL) or column (if VERTICAL) or processor (if PROC)</possible_values>
						<type>string</type>
						<value>DEFAULT</value>
						<default_value>DEFAULT</default_value>
					</Parameter>
					<Parameter name="stratification_type">
						<description>type of stratification</description>
						<possible_values>HORIZONTAL:use distribution_type parameter for each row; VERTICAL:use distribution_type parameter for each column; PROC:use distribution_type parameter for each processor; ANNULAR:use annular parameters group; ZONES2:use zones2 parameters group; FRACTURE_HORIZONTAL:use fracture_horizontal parameters group; PARABOLIC:see source code</possible_values>
						<type>string</type>
						<value>HORIZONTAL</value>
						<default_value>HORIZONTAL</default_value>
					</Parameter>
					<ParametersGroup name="annular">
						<Parameter name="exponent">
							<description>exponent of the power dependence towards the center</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="fracture_horizontal">
						<Parameter name="val_fracture">
							<description>value within the fracture</description>
							<possible_values/>
							<type>double</type>
							<value>10</value>
							<default_value>10</default_value>
						</Parameter>
						<Parameter name="val_matrix">
							<description>value within the matrix</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="zones2">
						<Parameter name="direction">
							<description>direction in which the property varies</description>
							<possible_values>0: X axis; 1: Y axi; 2: Z axis</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="val_down">
							<description>value on the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val_down_definition">
							<description>to know which parameter defines the value on the lower side</description>
							<possible_values>VAL_DOWN: use val_down; RATIO: use val_down_ratio; EXPONENTIAL: use val_down_exponential</possible_values>
							<type>string</type>
							<value>VAL_DOWN</value>
							<default_value>VAL_DOWN</default_value>
						</Parameter>
						<Parameter name="val_down_exponential">
							<description>values in the lower side are defined by val_up*exp(-d/val_down_exponential), where d is the distance to the separation function</description>
							<possible_values/>
							<type>double</type>
							<value>0.1</value>
							<default_value>0.1</default_value>
						</Parameter>
						<Parameter name="val_down_ratio">
							<description>ratio that multiplies val_up to define the value in the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>0.5</value>
							<default_value>0.5</default_value>
						</Parameter>
						<Parameter name="val_up">
							<description>value in the upper side</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<ParametersGroup name="separation_function">
							<Parameter name="separation_type">
								<description>topography of the separation between the 2 zones</description>
								<possible_values>CONST_MIDDLE: middle of the domain; LINEAR: use a 1D linear function along the X axis; FILE: load the separation function from a file</possible_values>
								<type>string</type>
								<value>CONST_MIDDLE</value>
								<default_value>CONST_MIDDLE</default_value>
							</Parameter>
							<ParametersGroup name="file">
								<Parameter name="file_path">
									<description>path of the topography file ; format is 1st column is i, 2nd column is k and 3rd column is topo</description>
									<possible_values/>
									<type>string</type>
									<value>NO_FILE</value>
									<default_value>NO_FILE</default_value>
								</Parameter>
								<Parameter name="file_type">
									<description>format of the topography file</description>
									<possible_values>BASIC: i k value; GRD: .grd file</possible_values>
									<type>string</type>
									<value>BASIC</value>
									<default_value>BASIC</default_value>
								</Parameter>
								<Parameter name="scale_factor">
									<description>factor to multiply the separation read in file (after shifting)</description>
									<possible_values/>
									<type>double</type>
									<value>1</value>
									<default_value>1</default_value>
								</Parameter>
								<Parameter name="shift">
									<description>shift the separation read in file, real [L]</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
							<ParametersGroup name="linear_function">
								<Parameter name="a">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0.02</value>
									<default_value>0.02</default_value>
								</Parameter>
								<Parameter name="y0">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
						</ParametersGroup>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="structure">
					<Parameter name="Vijk">
						<description>values in blocs, ordered by a loop on Z blocs inside a loop on Y blocs inside a loop on X blocs; V1*V2*...*Vnv with nv = (nx+1)*(ny+1)*(nz+1)</description>
						<possible_values/>
						<type>string</type>
						<value>1e-1</value>
						<default_value>1e-1</default_value>
					</Parameter>
					<Parameter name="X_limits">
						<description>limits between blocs in X direction; X1*X2*...*Xnx in Xdirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Y_limits">
						<description>limits between blocs in Y direction; Y1*Y2*...*Yny in Ydirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Z_limits">
						<description>limits between blocs in Z direction; Z1*Z2*...*Znz in Z direction</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="velocity_x">
			<ParametersGroup name="grid_property">
				<Parameter name="add_fracture">
					<description>activate or deactivate the addition of fracture over the field already generated (fracture is defined in fracture group)</description>
					<possible_values>0: no fracture added; 1: fracture added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="add_lense">
					<description>activate or deactivate the addition of lense over the field already generated (lense is defined in lense groups)</description>
					<possible_values>0: no lense added; 1: lenses added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="field_type">
					<description>Type of field in terms of structure. ParametersGroup distribution is required for the three first options. </description>
					<possible_values>NO_CORRELATION:random non correlated field; CORRELATION:MultiGaussian correlated field; STRATIFICATION:Stratified field; STRUCTURE:Block structured field; FRACTAL:fractal and multifractal correlations; FILE:enter field from a file; INCLUSIONS:inclusions in an homogeneous field</possible_values>
					<type>string</type>
					<value>NO_CORRELATION</value>
					<default_value>NO_CORRELATION</default_value>
				</Parameter>
				<Parameter name="large_generation">
					<description>generates the permeability field in a 10 times larger grid to avoid border effects</description>
					<possible_values>0: classical generation; 1: enlarging the generation</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<ParametersGroup name="correlation">
					<Parameter name="correlation_type">
						<description>type of correlation function</description>
						<possible_values>GAUSSIAN; EXPONENTIAL; POWER</possible_values>
						<type>string</type>
						<value>GAUSSIAN</value>
						<default_value>GAUSSIAN</default_value>
					</Parameter>
					<Parameter name="generation_type">
						<description>REAL_SPACE: generates the correlation function, discretizes it and fourier transfrom it, FOURIER_SPACE: direct generation in fourier space</description>
						<possible_values>REAL_SPACE; FOURIER_SPACE</possible_values>
						<type>string</type>
						<value>REAL_SPACE</value>
						<default_value>REAL_SPACE</default_value>
					</Parameter>
					<Parameter name="periodic">
						<description>1: Generation of a periodic correlation domain</description>
						<possible_values/>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="exponential">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="gaussian">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<Parameter name="modification">
							<description>Modification of the correlation pattern in order to correlate more the larger values (PLUS), the smaller values (MINUS), to add fractures along the main flow direction (x) connecting the borders (F2) or not connecting the borders (F)</description>
							<possible_values>NO; PLUS; MINUS; F</possible_values>
							<type>string</type>
							<value>NO</value>
							<default_value>NO</default_value>
						</Parameter>
						<ParametersGroup name="F">
							<Parameter name="fraction_sizex">
								<description>length of fracture to be added: Lx/(fraction_sizex)</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="nb">
								<description>number of fractures to be added</description>
								<possible_values>&gt;0</possible_values>
								<type>int</type>
								<value>4</value>
								<default_value>4</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="power">
						<Parameter name="beta">
							<description>beta</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="cutoff">
							<description>cutoff length, 0&lt;val&lt;system size</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="power">
							<description>power</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="distribution">
					<Parameter name="distribution_type">
						<description>Type of value distribution. Each distribution is given a ParametersGroup for its parameters. </description>
						<possible_values>HOMO:constant; BINARY:binary distribution; UNIFORM:uniform distribution; NORMAL:Gaussian distribution; LOGNORMAL:Lognormal distribution; LOGUNIFORM:Loguniform distribution</possible_values>
						<type>string</type>
						<value>HOMO</value>
						<default_value>HOMO</default_value>
					</Parameter>
					<ParametersGroup name="binary">
						<Parameter name="val1">
							<description>first value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val2">
							<description>second value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="homo">
						<Parameter name="val">
							<description>Value of the homogeneous field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="lognormal">
						<Parameter name="lognormal_mean">
							<description>log-mean of the lognormal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="lognormal_std">
							<description>lof-standard deviation of the lognormal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="loguniform">
						<Parameter name="log_max">
							<description>log of ghe maximum of the loguniform distribution</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="log_min">
							<description>log of ghe minimum of the loguniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="normal">
						<Parameter name="mean">
							<description>mean of the normal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="std">
							<description>standard deviation of the normal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="uniform">
						<Parameter name="val_max">
							<description>maximum value of the uniform distribution </description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<Parameter name="val_min">
							<description>minimum value of the uniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="file_data">
					<Parameter name="column_name">
						<description>Name of the column to load, such as permeability, K1, porosity, velocity_x1, vz...</description>
						<possible_values/>
						<type>string</type>
						<value>property</value>
						<default_value>property</default_value>
					</Parameter>
					<Parameter name="file_path">
						<description>file path to get core values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
					<Parameter name="file_type">
						<description>type of file</description>
						<possible_values/>
						<type>string</type>
						<value>GOCAD</value>
						<default_value>GOCAD</default_value>
					</Parameter>
					<Parameter name="ref_file_path">
						<description>file path to get information about external values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="fracture">
					<Parameter name="aperture">
						<description>size of the aperture of the fracture (centered at the plan)</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="dip_angle">
						<description>angle (in degree) between the fracture plan and the horizontal plan</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="point_on_frac">
						<description>point on the fracture plan</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="strike_angle">
						<description>angle (in degree) between the fracture plan and the x axis</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="val_fracture">
						<description>value within the fracture</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="inclusions">
					<Parameter name="K_background">
						<description>background permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="K_inclusions">
						<description>inclusions permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_x">
						<description>characteristic distance between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_y">
						<description>characteristic distance of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="shape">
						<description>shape of the inclusions</description>
						<possible_values>SQUARE; RECTANGLE</possible_values>
						<type>string</type>
						<value>SQUARE</value>
						<default_value>SQUARE</default_value>
					</Parameter>
					<Parameter name="shift_x">
						<description>characteristic shift between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="shift_y">
						<description>characteristic shift of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_x">
						<description>characteristic size of the inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_y">
						<description>characteristic size of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="large_generation_param">
					<Parameter name="multiplication_factor">
						<description>Multiplication factor in terms of system size</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="lense">
					<Parameter name="position_lense">
						<description>point on the fracture plan; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="size_lense">
						<description>size of the aperture of the fracture (centered at the plan); for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.1,0.1,0.1]</value>
						<default_value>[0.1,0.1,0.1]</default_value>
					</Parameter>
					<Parameter name="val_lense">
						<description>value within the fracture; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="post_treatment">
					<Parameter name="analyses">
						<description>Type of geometrical characteristics computed on the field (classtats : neologism for classical stats &lt;=&gt;moments, min, max, standard deviation)</description>
						<possible_values>none; classtats; corr_length; cs4; s2_scaled; s2; cf1k; cf2k</possible_values>
						<type>string</type>
						<value>classtats</value>
						<default_value>classtats</default_value>
					</Parameter>
					<Parameter name="analyses_scale">
						<description>Scale with which the permeability field is analyzed</description>
						<possible_values>lin; log</possible_values>
						<type>string</type>
						<value>log</value>
						<default_value>log</default_value>
					</Parameter>
					<Parameter name="outputs">
						<description>Additional large outputs like no outputs, outputs in its own file (single) or ouputs in a general file (heap)</description>
						<possible_values>0 : no; 1: yes</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="outputs_format">
						<description>Different output formats</description>
						<possible_values>classic; gocad; vtk; vtk_flow_line:vtk with particle number</possible_values>
						<type>string</type>
						<value>classic</value>
						<default_value>classic</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="stratification">
					<Parameter name="distribution_type">
						<description>distribution of values in the strates</description>
						<possible_values>DEFAULT:the distribution defined before; STRAT_NB:the index of the row (if HORIZONTAL) or column (if VERTICAL) or processor (if PROC)</possible_values>
						<type>string</type>
						<value>DEFAULT</value>
						<default_value>DEFAULT</default_value>
					</Parameter>
					<Parameter name="stratification_type">
						<description>type of stratification</description>
						<possible_values>HORIZONTAL:use distribution_type parameter for each row; VERTICAL:use distribution_type parameter for each column; PROC:use distribution_type parameter for each processor; ANNULAR:use annular parameters group; ZONES2:use zones2 parameters group; FRACTURE_HORIZONTAL:use fracture_horizontal parameters group; PARABOLIC:see source code</possible_values>
						<type>string</type>
						<value>HORIZONTAL</value>
						<default_value>HORIZONTAL</default_value>
					</Parameter>
					<ParametersGroup name="annular">
						<Parameter name="exponent">
							<description>exponent of the power dependence towards the center</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="fracture_horizontal">
						<Parameter name="val_fracture">
							<description>value within the fracture</description>
							<possible_values/>
							<type>double</type>
							<value>10</value>
							<default_value>10</default_value>
						</Parameter>
						<Parameter name="val_matrix">
							<description>value within the matrix</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="zones2">
						<Parameter name="direction">
							<description>direction in which the property varies</description>
							<possible_values>0: X axis; 1: Y axi; 2: Z axis</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="val_down">
							<description>value on the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val_down_definition">
							<description>to know which parameter defines the value on the lower side</description>
							<possible_values>VAL_DOWN: use val_down; RATIO: use val_down_ratio; EXPONENTIAL: use val_down_exponential</possible_values>
							<type>string</type>
							<value>VAL_DOWN</value>
							<default_value>VAL_DOWN</default_value>
						</Parameter>
						<Parameter name="val_down_exponential">
							<description>values in the lower side are defined by val_up*exp(-d/val_down_exponential), where d is the distance to the separation function</description>
							<possible_values/>
							<type>double</type>
							<value>0.1</value>
							<default_value>0.1</default_value>
						</Parameter>
						<Parameter name="val_down_ratio">
							<description>ratio that multiplies val_up to define the value in the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>0.5</value>
							<default_value>0.5</default_value>
						</Parameter>
						<Parameter name="val_up">
							<description>value in the upper side</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<ParametersGroup name="separation_function">
							<Parameter name="separation_type">
								<description>topography of the separation between the 2 zones</description>
								<possible_values>CONST_MIDDLE: middle of the domain; LINEAR: use a 1D linear function along the X axis; FILE: load the separation function from a file</possible_values>
								<type>string</type>
								<value>CONST_MIDDLE</value>
								<default_value>CONST_MIDDLE</default_value>
							</Parameter>
							<ParametersGroup name="file">
								<Parameter name="file_path">
									<description>path of the topography file ; format is 1st column is i, 2nd column is k and 3rd column is topo</description>
									<possible_values/>
									<type>string</type>
									<value>NO_FILE</value>
									<default_value>NO_FILE</default_value>
								</Parameter>
								<Parameter name="file_type">
									<description>format of the topography file</description>
									<possible_values>BASIC: i k value; GRD: .grd file</possible_values>
									<type>string</type>
									<value>BASIC</value>
									<default_value>BASIC</default_value>
								</Parameter>
								<Parameter name="scale_factor">
									<description>factor to multiply the separation read in file (after shifting)</description>
									<possible_values/>
									<type>double</type>
									<value>1</value>
									<default_value>1</default_value>
								</Parameter>
								<Parameter name="shift">
									<description>shift the separation read in file, real [L]</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
							<ParametersGroup name="linear_function">
								<Parameter name="a">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0.02</value>
									<default_value>0.02</default_value>
								</Parameter>
								<Parameter name="y0">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
						</ParametersGroup>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="structure">
					<Parameter name="Vijk">
						<description>values in blocs, ordered by a loop on Z blocs inside a loop on Y blocs inside a loop on X blocs; V1*V2*...*Vnv with nv = (nx+1)*(ny+1)*(nz+1)</description>
						<possible_values/>
						<type>string</type>
						<value>1e-1</value>
						<default_value>1e-1</default_value>
					</Parameter>
					<Parameter name="X_limits">
						<description>limits between blocs in X direction; X1*X2*...*Xnx in Xdirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Y_limits">
						<description>limits between blocs in Y direction; Y1*Y2*...*Yny in Ydirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Z_limits">
						<description>limits between blocs in Z direction; Z1*Z2*...*Znz in Z direction</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="velocity_y">
			<ParametersGroup name="grid_property">
				<Parameter name="add_fracture">
					<description>activate or deactivate the addition of fracture over the field already generated (fracture is defined in fracture group)</description>
					<possible_values>0: no fracture added; 1: fracture added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="add_lense">
					<description>activate or deactivate the addition of lense over the field already generated (lense is defined in lense groups)</description>
					<possible_values>0: no lense added; 1: lenses added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="field_type">
					<description>Type of field in terms of structure. ParametersGroup distribution is required for the three first options. </description>
					<possible_values>NO_CORRELATION:random non correlated field; CORRELATION:MultiGaussian correlated field; STRATIFICATION:Stratified field; STRUCTURE:Block structured field; FRACTAL:fractal and multifractal correlations; FILE:enter field from a file; INCLUSIONS:inclusions in an homogeneous field</possible_values>
					<type>string</type>
					<value>NO_CORRELATION</value>
					<default_value>NO_CORRELATION</default_value>
				</Parameter>
				<Parameter name="large_generation">
					<description>generates the permeability field in a 10 times larger grid to avoid border effects</description>
					<possible_values>0: classical generation; 1: enlarging the generation</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<ParametersGroup name="correlation">
					<Parameter name="correlation_type">
						<description>type of correlation function</description>
						<possible_values>GAUSSIAN; EXPONENTIAL; POWER</possible_values>
						<type>string</type>
						<value>GAUSSIAN</value>
						<default_value>GAUSSIAN</default_value>
					</Parameter>
					<Parameter name="generation_type">
						<description>REAL_SPACE: generates the correlation function, discretizes it and fourier transfrom it, FOURIER_SPACE: direct generation in fourier space</description>
						<possible_values>REAL_SPACE; FOURIER_SPACE</possible_values>
						<type>string</type>
						<value>REAL_SPACE</value>
						<default_value>REAL_SPACE</default_value>
					</Parameter>
					<Parameter name="periodic">
						<description>1: Generation of a periodic correlation domain</description>
						<possible_values/>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="exponential">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="gaussian">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<Parameter name="modification">
							<description>Modification of the correlation pattern in order to correlate more the larger values (PLUS), the smaller values (MINUS), to add fractures along the main flow direction (x) connecting the borders (F2) or not connecting the borders (F)</description>
							<possible_values>NO; PLUS; MINUS; F</possible_values>
							<type>string</type>
							<value>NO</value>
							<default_value>NO</default_value>
						</Parameter>
						<ParametersGroup name="F">
							<Parameter name="fraction_sizex">
								<description>length of fracture to be added: Lx/(fraction_sizex)</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="nb">
								<description>number of fractures to be added</description>
								<possible_values>&gt;0</possible_values>
								<type>int</type>
								<value>4</value>
								<default_value>4</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="power">
						<Parameter name="beta">
							<description>beta</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="cutoff">
							<description>cutoff length, 0&lt;val&lt;system size</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="power">
							<description>power</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="distribution">
					<Parameter name="distribution_type">
						<description>Type of value distribution. Each distribution is given a ParametersGroup for its parameters. </description>
						<possible_values>HOMO:constant; BINARY:binary distribution; UNIFORM:uniform distribution; NORMAL:Gaussian distribution; LOGNORMAL:Lognormal distribution; LOGUNIFORM:Loguniform distribution</possible_values>
						<type>string</type>
						<value>HOMO</value>
						<default_value>HOMO</default_value>
					</Parameter>
					<ParametersGroup name="binary">
						<Parameter name="val1">
							<description>first value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val2">
							<description>second value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="homo">
						<Parameter name="val">
							<description>Value of the homogeneous field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="lognormal">
						<Parameter name="lognormal_mean">
							<description>log-mean of the lognormal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="lognormal_std">
							<description>lof-standard deviation of the lognormal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="loguniform">
						<Parameter name="log_max">
							<description>log of ghe maximum of the loguniform distribution</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="log_min">
							<description>log of ghe minimum of the loguniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="normal">
						<Parameter name="mean">
							<description>mean of the normal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="std">
							<description>standard deviation of the normal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="uniform">
						<Parameter name="val_max">
							<description>maximum value of the uniform distribution </description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<Parameter name="val_min">
							<description>minimum value of the uniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="file_data">
					<Parameter name="column_name">
						<description>Name of the column to load, such as permeability, K1, porosity, velocity_x1, vz...</description>
						<possible_values/>
						<type>string</type>
						<value>property</value>
						<default_value>property</default_value>
					</Parameter>
					<Parameter name="file_path">
						<description>file path to get core values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
					<Parameter name="file_type">
						<description>type of file</description>
						<possible_values/>
						<type>string</type>
						<value>GOCAD</value>
						<default_value>GOCAD</default_value>
					</Parameter>
					<Parameter name="ref_file_path">
						<description>file path to get information about external values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="fracture">
					<Parameter name="aperture">
						<description>size of the aperture of the fracture (centered at the plan)</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="dip_angle">
						<description>angle (in degree) between the fracture plan and the horizontal plan</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="point_on_frac">
						<description>point on the fracture plan</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="strike_angle">
						<description>angle (in degree) between the fracture plan and the x axis</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="val_fracture">
						<description>value within the fracture</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="inclusions">
					<Parameter name="K_background">
						<description>background permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="K_inclusions">
						<description>inclusions permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_x">
						<description>characteristic distance between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_y">
						<description>characteristic distance of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="shape">
						<description>shape of the inclusions</description>
						<possible_values>SQUARE; RECTANGLE</possible_values>
						<type>string</type>
						<value>SQUARE</value>
						<default_value>SQUARE</default_value>
					</Parameter>
					<Parameter name="shift_x">
						<description>characteristic shift between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="shift_y">
						<description>characteristic shift of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_x">
						<description>characteristic size of the inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_y">
						<description>characteristic size of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="large_generation_param">
					<Parameter name="multiplication_factor">
						<description>Multiplication factor in terms of system size</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="lense">
					<Parameter name="position_lense">
						<description>point on the fracture plan; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="size_lense">
						<description>size of the aperture of the fracture (centered at the plan); for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.1,0.1,0.1]</value>
						<default_value>[0.1,0.1,0.1]</default_value>
					</Parameter>
					<Parameter name="val_lense">
						<description>value within the fracture; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="post_treatment">
					<Parameter name="analyses">
						<description>Type of geometrical characteristics computed on the field (classtats : neologism for classical stats &lt;=&gt;moments, min, max, standard deviation)</description>
						<possible_values>none; classtats; corr_length; cs4; s2_scaled; s2; cf1k; cf2k</possible_values>
						<type>string</type>
						<value>classtats</value>
						<default_value>classtats</default_value>
					</Parameter>
					<Parameter name="analyses_scale">
						<description>Scale with which the permeability field is analyzed</description>
						<possible_values>lin; log</possible_values>
						<type>string</type>
						<value>log</value>
						<default_value>log</default_value>
					</Parameter>
					<Parameter name="outputs">
						<description>Additional large outputs like no outputs, outputs in its own file (single) or ouputs in a general file (heap)</description>
						<possible_values>0 : no; 1: yes</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="outputs_format">
						<description>Different output formats</description>
						<possible_values>classic; gocad; vtk; vtk_flow_line:vtk with particle number</possible_values>
						<type>string</type>
						<value>classic</value>
						<default_value>classic</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="stratification">
					<Parameter name="distribution_type">
						<description>distribution of values in the strates</description>
						<possible_values>DEFAULT:the distribution defined before; STRAT_NB:the index of the row (if HORIZONTAL) or column (if VERTICAL) or processor (if PROC)</possible_values>
						<type>string</type>
						<value>DEFAULT</value>
						<default_value>DEFAULT</default_value>
					</Parameter>
					<Parameter name="stratification_type">
						<description>type of stratification</description>
						<possible_values>HORIZONTAL:use distribution_type parameter for each row; VERTICAL:use distribution_type parameter for each column; PROC:use distribution_type parameter for each processor; ANNULAR:use annular parameters group; ZONES2:use zones2 parameters group; FRACTURE_HORIZONTAL:use fracture_horizontal parameters group; PARABOLIC:see source code</possible_values>
						<type>string</type>
						<value>HORIZONTAL</value>
						<default_value>HORIZONTAL</default_value>
					</Parameter>
					<ParametersGroup name="annular">
						<Parameter name="exponent">
							<description>exponent of the power dependence towards the center</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="fracture_horizontal">
						<Parameter name="val_fracture">
							<description>value within the fracture</description>
							<possible_values/>
							<type>double</type>
							<value>10</value>
							<default_value>10</default_value>
						</Parameter>
						<Parameter name="val_matrix">
							<description>value within the matrix</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="zones2">
						<Parameter name="direction">
							<description>direction in which the property varies</description>
							<possible_values>0: X axis; 1: Y axi; 2: Z axis</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="val_down">
							<description>value on the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val_down_definition">
							<description>to know which parameter defines the value on the lower side</description>
							<possible_values>VAL_DOWN: use val_down; RATIO: use val_down_ratio; EXPONENTIAL: use val_down_exponential</possible_values>
							<type>string</type>
							<value>VAL_DOWN</value>
							<default_value>VAL_DOWN</default_value>
						</Parameter>
						<Parameter name="val_down_exponential">
							<description>values in the lower side are defined by val_up*exp(-d/val_down_exponential), where d is the distance to the separation function</description>
							<possible_values/>
							<type>double</type>
							<value>0.1</value>
							<default_value>0.1</default_value>
						</Parameter>
						<Parameter name="val_down_ratio">
							<description>ratio that multiplies val_up to define the value in the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>0.5</value>
							<default_value>0.5</default_value>
						</Parameter>
						<Parameter name="val_up">
							<description>value in the upper side</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<ParametersGroup name="separation_function">
							<Parameter name="separation_type">
								<description>topography of the separation between the 2 zones</description>
								<possible_values>CONST_MIDDLE: middle of the domain; LINEAR: use a 1D linear function along the X axis; FILE: load the separation function from a file</possible_values>
								<type>string</type>
								<value>CONST_MIDDLE</value>
								<default_value>CONST_MIDDLE</default_value>
							</Parameter>
							<ParametersGroup name="file">
								<Parameter name="file_path">
									<description>path of the topography file ; format is 1st column is i, 2nd column is k and 3rd column is topo</description>
									<possible_values/>
									<type>string</type>
									<value>NO_FILE</value>
									<default_value>NO_FILE</default_value>
								</Parameter>
								<Parameter name="file_type">
									<description>format of the topography file</description>
									<possible_values>BASIC: i k value; GRD: .grd file</possible_values>
									<type>string</type>
									<value>BASIC</value>
									<default_value>BASIC</default_value>
								</Parameter>
								<Parameter name="scale_factor">
									<description>factor to multiply the separation read in file (after shifting)</description>
									<possible_values/>
									<type>double</type>
									<value>1</value>
									<default_value>1</default_value>
								</Parameter>
								<Parameter name="shift">
									<description>shift the separation read in file, real [L]</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
							<ParametersGroup name="linear_function">
								<Parameter name="a">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0.02</value>
									<default_value>0.02</default_value>
								</Parameter>
								<Parameter name="y0">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
						</ParametersGroup>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="structure">
					<Parameter name="Vijk">
						<description>values in blocs, ordered by a loop on Z blocs inside a loop on Y blocs inside a loop on X blocs; V1*V2*...*Vnv with nv = (nx+1)*(ny+1)*(nz+1)</description>
						<possible_values/>
						<type>string</type>
						<value>1e-1</value>
						<default_value>1e-1</default_value>
					</Parameter>
					<Parameter name="X_limits">
						<description>limits between blocs in X direction; X1*X2*...*Xnx in Xdirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Y_limits">
						<description>limits between blocs in Y direction; Y1*Y2*...*Yny in Ydirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Z_limits">
						<description>limits between blocs in Z direction; Z1*Z2*...*Znz in Z direction</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
		<ParametersGroup name="velocity_z">
			<ParametersGroup name="grid_property">
				<Parameter name="add_fracture">
					<description>activate or deactivate the addition of fracture over the field already generated (fracture is defined in fracture group)</description>
					<possible_values>0: no fracture added; 1: fracture added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="add_lense">
					<description>activate or deactivate the addition of lense over the field already generated (lense is defined in lense groups)</description>
					<possible_values>0: no lense added; 1: lenses added</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<Parameter name="field_type">
					<description>Type of field in terms of structure. ParametersGroup distribution is required for the three first options. </description>
					<possible_values>NO_CORRELATION:random non correlated field; CORRELATION:MultiGaussian correlated field; STRATIFICATION:Stratified field; STRUCTURE:Block structured field; FRACTAL:fractal and multifractal correlations; FILE:enter field from a file; INCLUSIONS:inclusions in an homogeneous field</possible_values>
					<type>string</type>
					<value>NO_CORRELATION</value>
					<default_value>NO_CORRELATION</default_value>
				</Parameter>
				<Parameter name="large_generation">
					<description>generates the permeability field in a 10 times larger grid to avoid border effects</description>
					<possible_values>0: classical generation; 1: enlarging the generation</possible_values>
					<type>bool</type>
					<value>0</value>
					<default_value>0</default_value>
				</Parameter>
				<ParametersGroup name="correlation">
					<Parameter name="correlation_type">
						<description>type of correlation function</description>
						<possible_values>GAUSSIAN; EXPONENTIAL; POWER</possible_values>
						<type>string</type>
						<value>GAUSSIAN</value>
						<default_value>GAUSSIAN</default_value>
					</Parameter>
					<Parameter name="generation_type">
						<description>REAL_SPACE: generates the correlation function, discretizes it and fourier transfrom it, FOURIER_SPACE: direct generation in fourier space</description>
						<possible_values>REAL_SPACE; FOURIER_SPACE</possible_values>
						<type>string</type>
						<value>REAL_SPACE</value>
						<default_value>REAL_SPACE</default_value>
					</Parameter>
					<Parameter name="periodic">
						<description>1: Generation of a periodic correlation domain</description>
						<possible_values/>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<ParametersGroup name="exponential">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="gaussian">
						<Parameter name="isotropy">
							<description>isotropy or anisotropy</description>
							<possible_values>ISOTROPIC:isotropy; ANISOTROPIC:anisostropy</possible_values>
							<type>string</type>
							<value>ISOTROPIC</value>
							<default_value>ISOTROPIC</default_value>
						</Parameter>
						<Parameter name="modification">
							<description>Modification of the correlation pattern in order to correlate more the larger values (PLUS), the smaller values (MINUS), to add fractures along the main flow direction (x) connecting the borders (F2) or not connecting the borders (F)</description>
							<possible_values>NO; PLUS; MINUS; F</possible_values>
							<type>string</type>
							<value>NO</value>
							<default_value>NO</default_value>
						</Parameter>
						<ParametersGroup name="F">
							<Parameter name="fraction_sizex">
								<description>length of fracture to be added: Lx/(fraction_sizex)</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="nb">
								<description>number of fractures to be added</description>
								<possible_values>&gt;0</possible_values>
								<type>int</type>
								<value>4</value>
								<default_value>4</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="anisotropic">
							<Parameter name="lambda_x">
								<description>correlation length in direction x</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
							<Parameter name="lambda_y">
								<description>correlation length in direction y</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
							<Parameter name="lambda_z">
								<description>correlation length in direction z</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>5</value>
								<default_value>5</default_value>
							</Parameter>
						</ParametersGroup>
						<ParametersGroup name="isotropic">
							<Parameter name="lambda">
								<description>correlation length</description>
								<possible_values>&gt;0</possible_values>
								<type>double</type>
								<value>10</value>
								<default_value>10</default_value>
							</Parameter>
						</ParametersGroup>
					</ParametersGroup>
					<ParametersGroup name="power">
						<Parameter name="beta">
							<description>beta</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="cutoff">
							<description>cutoff length, 0&lt;val&lt;system size</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="power">
							<description>power</description>
							<possible_values>&gt;0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="distribution">
					<Parameter name="distribution_type">
						<description>Type of value distribution. Each distribution is given a ParametersGroup for its parameters. </description>
						<possible_values>HOMO:constant; BINARY:binary distribution; UNIFORM:uniform distribution; NORMAL:Gaussian distribution; LOGNORMAL:Lognormal distribution; LOGUNIFORM:Loguniform distribution</possible_values>
						<type>string</type>
						<value>HOMO</value>
						<default_value>HOMO</default_value>
					</Parameter>
					<ParametersGroup name="binary">
						<Parameter name="val1">
							<description>first value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val2">
							<description>second value of the binary field</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="homo">
						<Parameter name="val">
							<description>Value of the homogeneous field</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="lognormal">
						<Parameter name="lognormal_mean">
							<description>log-mean of the lognormal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="lognormal_std">
							<description>lof-standard deviation of the lognormal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="loguniform">
						<Parameter name="log_max">
							<description>log of ghe maximum of the loguniform distribution</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="log_min">
							<description>log of ghe minimum of the loguniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="normal">
						<Parameter name="mean">
							<description>mean of the normal distribution</description>
							<possible_values/>
							<type>double</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="std">
							<description>standard deviation of the normal distribution</description>
							<possible_values>&gt;=0</possible_values>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="uniform">
						<Parameter name="val_max">
							<description>maximum value of the uniform distribution </description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<Parameter name="val_min">
							<description>minimum value of the uniform distribution. Internal check that max &gt; min</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="file_data">
					<Parameter name="column_name">
						<description>Name of the column to load, such as permeability, K1, porosity, velocity_x1, vz...</description>
						<possible_values/>
						<type>string</type>
						<value>property</value>
						<default_value>property</default_value>
					</Parameter>
					<Parameter name="file_path">
						<description>file path to get core values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
					<Parameter name="file_type">
						<description>type of file</description>
						<possible_values/>
						<type>string</type>
						<value>GOCAD</value>
						<default_value>GOCAD</default_value>
					</Parameter>
					<Parameter name="ref_file_path">
						<description>file path to get information about external values</description>
						<possible_values/>
						<type>string</type>
						<value>NO_FILE</value>
						<default_value>NO_FILE</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="fracture">
					<Parameter name="aperture">
						<description>size of the aperture of the fracture (centered at the plan)</description>
						<possible_values/>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="dip_angle">
						<description>angle (in degree) between the fracture plan and the horizontal plan</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="point_on_frac">
						<description>point on the fracture plan</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="strike_angle">
						<description>angle (in degree) between the fracture plan and the x axis</description>
						<possible_values/>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="val_fracture">
						<description>value within the fracture</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="inclusions">
					<Parameter name="K_background">
						<description>background permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>1</value>
						<default_value>1</default_value>
					</Parameter>
					<Parameter name="K_inclusions">
						<description>inclusions permeability</description>
						<possible_values>&gt;0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_x">
						<description>characteristic distance between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="lag_y">
						<description>characteristic distance of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="shape">
						<description>shape of the inclusions</description>
						<possible_values>SQUARE; RECTANGLE</possible_values>
						<type>string</type>
						<value>SQUARE</value>
						<default_value>SQUARE</default_value>
					</Parameter>
					<Parameter name="shift_x">
						<description>characteristic shift between inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="shift_y">
						<description>characteristic shift of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_x">
						<description>characteristic size of the inclusions along x</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
					<Parameter name="size_y">
						<description>characteristic size of the inclusions along y</description>
						<possible_values>&gt;=0</possible_values>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="large_generation_param">
					<Parameter name="multiplication_factor">
						<description>Multiplication factor in terms of system size</description>
						<possible_values/>
						<type>double</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="lense">
					<Parameter name="position_lense">
						<description>point on the fracture plan; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.5,0.5,0.5]</value>
						<default_value>[0.5,0.5,0.5]</default_value>
					</Parameter>
					<Parameter name="size_lense">
						<description>size of the aperture of the fracture (centered at the plan); for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>[0.1,0.1,0.1]</value>
						<default_value>[0.1,0.1,0.1]</default_value>
					</Parameter>
					<Parameter name="val_lense">
						<description>value within the fracture; for several, separate with #</description>
						<possible_values/>
						<type>string</type>
						<value>10</value>
						<default_value>10</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="post_treatment">
					<Parameter name="analyses">
						<description>Type of geometrical characteristics computed on the field (classtats : neologism for classical stats &lt;=&gt;moments, min, max, standard deviation)</description>
						<possible_values>none; classtats; corr_length; cs4; s2_scaled; s2; cf1k; cf2k</possible_values>
						<type>string</type>
						<value>classtats</value>
						<default_value>classtats</default_value>
					</Parameter>
					<Parameter name="analyses_scale">
						<description>Scale with which the permeability field is analyzed</description>
						<possible_values>lin; log</possible_values>
						<type>string</type>
						<value>log</value>
						<default_value>log</default_value>
					</Parameter>
					<Parameter name="outputs">
						<description>Additional large outputs like no outputs, outputs in its own file (single) or ouputs in a general file (heap)</description>
						<possible_values>0 : no; 1: yes</possible_values>
						<type>bool</type>
						<value>0</value>
						<default_value>0</default_value>
					</Parameter>
					<Parameter name="outputs_format">
						<description>Different output formats</description>
						<possible_values>classic; gocad; vtk; vtk_flow_line:vtk with particle number</possible_values>
						<type>string</type>
						<value>classic</value>
						<default_value>classic</default_value>
					</Parameter>
				</ParametersGroup>
				<ParametersGroup name="stratification">
					<Parameter name="distribution_type">
						<description>distribution of values in the strates</description>
						<possible_values>DEFAULT:the distribution defined before; STRAT_NB:the index of the row (if HORIZONTAL) or column (if VERTICAL) or processor (if PROC)</possible_values>
						<type>string</type>
						<value>DEFAULT</value>
						<default_value>DEFAULT</default_value>
					</Parameter>
					<Parameter name="stratification_type">
						<description>type of stratification</description>
						<possible_values>HORIZONTAL:use distribution_type parameter for each row; VERTICAL:use distribution_type parameter for each column; PROC:use distribution_type parameter for each processor; ANNULAR:use annular parameters group; ZONES2:use zones2 parameters group; FRACTURE_HORIZONTAL:use fracture_horizontal parameters group; PARABOLIC:see source code</possible_values>
						<type>string</type>
						<value>HORIZONTAL</value>
						<default_value>HORIZONTAL</default_value>
					</Parameter>
					<ParametersGroup name="annular">
						<Parameter name="exponent">
							<description>exponent of the power dependence towards the center</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="fracture_horizontal">
						<Parameter name="val_fracture">
							<description>value within the fracture</description>
							<possible_values/>
							<type>double</type>
							<value>10</value>
							<default_value>10</default_value>
						</Parameter>
						<Parameter name="val_matrix">
							<description>value within the matrix</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
					</ParametersGroup>
					<ParametersGroup name="zones2">
						<Parameter name="direction">
							<description>direction in which the property varies</description>
							<possible_values>0: X axis; 1: Y axi; 2: Z axis</possible_values>
							<type>short</type>
							<value>0</value>
							<default_value>0</default_value>
						</Parameter>
						<Parameter name="val_down">
							<description>value on the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>1</value>
							<default_value>1</default_value>
						</Parameter>
						<Parameter name="val_down_definition">
							<description>to know which parameter defines the value on the lower side</description>
							<possible_values>VAL_DOWN: use val_down; RATIO: use val_down_ratio; EXPONENTIAL: use val_down_exponential</possible_values>
							<type>string</type>
							<value>VAL_DOWN</value>
							<default_value>VAL_DOWN</default_value>
						</Parameter>
						<Parameter name="val_down_exponential">
							<description>values in the lower side are defined by val_up*exp(-d/val_down_exponential), where d is the distance to the separation function</description>
							<possible_values/>
							<type>double</type>
							<value>0.1</value>
							<default_value>0.1</default_value>
						</Parameter>
						<Parameter name="val_down_ratio">
							<description>ratio that multiplies val_up to define the value in the lower side</description>
							<possible_values/>
							<type>double</type>
							<value>0.5</value>
							<default_value>0.5</default_value>
						</Parameter>
						<Parameter name="val_up">
							<description>value in the upper side</description>
							<possible_values/>
							<type>double</type>
							<value>2</value>
							<default_value>2</default_value>
						</Parameter>
						<ParametersGroup name="separation_function">
							<Parameter name="separation_type">
								<description>topography of the separation between the 2 zones</description>
								<possible_values>CONST_MIDDLE: middle of the domain; LINEAR: use a 1D linear function along the X axis; FILE: load the separation function from a file</possible_values>
								<type>string</type>
								<value>CONST_MIDDLE</value>
								<default_value>CONST_MIDDLE</default_value>
							</Parameter>
							<ParametersGroup name="file">
								<Parameter name="file_path">
									<description>path of the topography file ; format is 1st column is i, 2nd column is k and 3rd column is topo</description>
									<possible_values/>
									<type>string</type>
									<value>NO_FILE</value>
									<default_value>NO_FILE</default_value>
								</Parameter>
								<Parameter name="file_type">
									<description>format of the topography file</description>
									<possible_values>BASIC: i k value; GRD: .grd file</possible_values>
									<type>string</type>
									<value>BASIC</value>
									<default_value>BASIC</default_value>
								</Parameter>
								<Parameter name="scale_factor">
									<description>factor to multiply the separation read in file (after shifting)</description>
									<possible_values/>
									<type>double</type>
									<value>1</value>
									<default_value>1</default_value>
								</Parameter>
								<Parameter name="shift">
									<description>shift the separation read in file, real [L]</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
							<ParametersGroup name="linear_function">
								<Parameter name="a">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0.02</value>
									<default_value>0.02</default_value>
								</Parameter>
								<Parameter name="y0">
									<description>y0+a*x</description>
									<possible_values/>
									<type>double</type>
									<value>0</value>
									<default_value>0</default_value>
								</Parameter>
							</ParametersGroup>
						</ParametersGroup>
					</ParametersGroup>
				</ParametersGroup>
				<ParametersGroup name="structure">
					<Parameter name="Vijk">
						<description>values in blocs, ordered by a loop on Z blocs inside a loop on Y blocs inside a loop on X blocs; V1*V2*...*Vnv with nv = (nx+1)*(ny+1)*(nz+1)</description>
						<possible_values/>
						<type>string</type>
						<value>1e-1</value>
						<default_value>1e-1</default_value>
					</Parameter>
					<Parameter name="X_limits">
						<description>limits between blocs in X direction; X1*X2*...*Xnx in Xdirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Y_limits">
						<description>limits between blocs in Y direction; Y1*Y2*...*Yny in Ydirection</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
					<Parameter name="Z_limits">
						<description>limits between blocs in Z direction; Z1*Z2*...*Znz in Z direction</description>
						<possible_values/>
						<type>string</type>
						<value>UNIFORM</value>
						<default_value>UNIFORM</default_value>
					</Parameter>
				</ParametersGroup>
			</ParametersGroup>
		</ParametersGroup>
	</ParametersGroup>
	<Parameter name="test">
		<description>limit testing</description>
		<possible_values/>
		<type>string</type>
		<value>UNIFORM</value>
		<default_value>UNIFORM</default_value>
</Parameter>
</ParametersGroup>

`;
  
	
  }
  
  renameTags(v: string): string {
    switch(v) {
      case "Parameter":
        return "parameters";
    }
    return v;
  }

  async parseXml(xmlString: string) {
    const parser = new Parser({
      "trim": true,
      "mergeAttrs": true,
      tagNameProcessors: [this.renameTags],
    });
    return await new Promise((resolve, reject) => parser.parseString(xmlString, (err: any, jsonData: any) => {
      if (err) {
        reject(err);
      }
      resolve(jsonData);
    }));
  }

  public async getJSONData(): Promise<ParametersGroup> {
	return this.parseXml(this.xmlData)
	.then((res: any) => {
	  return res.ParametersGroup as ParametersGroup;
	});
  }

  jsonToXml(json:any){
	const options = {
		beautify: true,
		selfClosing: true,
		attrKey: "name",
		// attrKey: "name",
		entityMap: {
		  '"': "&#34;",
		  "&": "&#38;"
		},
		declaration: {
		  encoding:'UTF-8',
		  standalone: 'no'
		}
	  }
	const xml = jsXmlParse.jsXml.toXmlString(options,json);
	console.log(xml);
  }

//   jsonToXml(json:any){
// 	const builder = new Builder();
// 	const xmlData = builder.buildObject(json);
// 	console.log(xmlData);
//   } 
}
